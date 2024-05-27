// const {firestore} = require('./firebaseConfig');
// const {collection, getDocs } = require('firebase/firestore');

import {firestore} from './firebaseConfig.js';
import {collection, getDocs, doc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";


// Function to fetch data from Firestore and return item objects
const fetchItems = () => {
    console.log("Fetching data from firebase");
    return new Promise((resolve, reject) => {
        const collectionRef = collection(firestore, 'wedding registry');
        getDocs(collectionRef).then((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (!data.SelectFlag){
                    const itemObject = {
                        item: data.Item,
                        link: data.Link,
                        image: data.ImageURL,
                        price: data.Price
                    };
                    items.push(itemObject);
                }
            });
            console.log("Fetching data from firebase completed");
            resolve(items); // Resolve with the array of item objects
        }).catch((error) => {
            reject(error); // Reject with error if there's any
        });
    });
  };
  

function updateSelectFlag(itemsArray, currentItem, name) {
    return new Promise((resolve, reject) => {
        // Simulate some asynchronous operation (e.g., updating data in Firestore)
        setTimeout(() => {
            console.log("CurrentItem item: " + JSON.stringify(currentItem));
            // Find the index of the item in the array
            const index = itemsArray.findIndex(item => JSON.stringify(item.item) === JSON.stringify(currentItem));
            console.log("Index of item: " + index);

            // If the item is found in the array
            if (index !== -1 && currentItem != 'Amazon Voucher') {
                const removedItem = itemsArray.splice(index, 1)[0];
                console.log("Removed Item:" + JSON.stringify(removedItem));
                console.log("Type of: " + typeof itemsArray);
                // Construct a reference to the collection
                const collectionRef = collection(firestore, 'wedding registry');
                
                // Construct a query to find the document with the specified 'Item' field value
                const q = query(collectionRef, where("Item", "==", removedItem.item));
                
                // Execute the query
                getDocs(q)
                    .then((querySnapshot) => {
                        // Check if any documents match the query
                        if (!querySnapshot.empty) {
                            // Access the first (and only) document in the query snapshot
                            const doc = querySnapshot.docs[0];
                            
                            // Update the document with the 'SelectFlag' field set to true
                            updateDoc(doc.ref, { SelectFlag: true, Name: name})
                                .then(() => {
                                    console.log("Document successfully updated!");
                                    // Resolve the promise with the updated array
                                    resolve(true);
                                })
                                .catch((error) => {
                                    console.error("Error updating document: ", error);
                                    // If Firestore update fails, reject the promise
                                    reject(error);
                                });
                        } else {
                            console.log("No matching documents found.");
                            // Resolve the promise with the original array
                            resolve(true);
                        }
                    })
                    .catch((error) => {
                        console.error("Error getting documents: ", error);
                        // If an error occurs, reject the promise
                        reject(error);
                    });
            } else {
                // If the item is not found, reject the promise
                reject(new Error('Item not found in the array'));
            }
        }, 0); // Simulate an asynchronous operation with setTimeout
    });
}


  // Export the initialized Firestore instance
export{fetchItems, updateSelectFlag};
// module.exports = {fetchItems};