// const fetchItems = require('./dataOperations.js');
import {fetchItems, updateSelectFlag} from './dataOperations.js';

const textbox = document.getElementById('textbox');
const giftDetailsBody = document.getElementById('giftDetailsBody');
const itemName = document.getElementById('itemName');
const selectButton = document.getElementById('selectButton');
const chooseAnotherButton = document.getElementById('chooseAnotherButton');
const confirmationModal = document.getElementById('confirmationModal');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const instruction = document.getElementById('instruction');
const bannerImage = document.getElementById('bannerImage');
const itemPrice=document.getElementById('itemPrice');
const itemLink=document.getElementById('itemLink');
const itemLinkName=document.getElementById('itemLinkName');
const nameModal = document.getElementById("nameModal");
const nameInput = document.getElementById("nameInput");
const cancelButton = document.getElementById("cancelButton");
const confirmNameButton=document.getElementById("confirmNameButton");
const thankYouModal=document.getElementById("thankYouModal");
const closeThankYouButton = document.getElementById("closeThankYouButton");

let giftItem = null;
let selectedGift = null;
let itemCount = 0;

fetchItems().then((items) => {
    // console.log("Type of Items: " + typeof items);
    giftItem = items;

}).catch((error) => {
    console.error('Error fetching items:', error);
});

textbox.addEventListener('click', () => {
    // Show loading message
    instruction.innerText = "Loading...";
    console.log("Inside event listener");
    
    fetchItems();
    randomSelectGift(giftItem);
});

selectButton.addEventListener('click', () => {
    confirmationModal.style.display = 'flex';
});

chooseAnotherButton.addEventListener('click', () => {
     randomSelectGift(giftItem);  
     
});

yesButton.addEventListener('click', function() {
    showModal(nameModal);
});

noButton.addEventListener('click', () => {
    confirmationModal.style.display = "none";
});

cancelButton.addEventListener('click', function() {
    hideModal(nameModal);
    confirmationModal.style.display = "none";
});

// Event listener for confirm name button
confirmNameButton.addEventListener("click", function() {
    const name = document.getElementById("nameInput").value;
    if (/^[A-Za-z\s]+$/.test(name.trim())) {
        console.log("Gift: " + giftItem + "\n Selected Item: " + selectedGift.item);
        let updateCompleted = updateSelectFlag(giftItem, selectedGift.item, name);
        console.log("Items list after one is selected: " + updateCompleted);

        window.open(selectedGift.link, "_blank");
        document.getElementById("nameInput").value = "";
        hideModal(nameModal);
        confirmationModal.style.display = "none";
        showModal(thankYouModal);
    } else {
        alert("Please enter your name.");
    }
});

closeThankYouButton.addEventListener("click", function() {
    hideModal(thankYouModal)
    itemCount=0
    fetchItems();
    randomSelectGift(giftItem); 
});

function randomSelectGift(items) {
    
    setTimeout(() => {       
        // Randomly select a gift
        // const randomIndex = Math.floor(Math.random() * items.length);
        console.log("ItemDetail " + items)
        console.log("Item Count " + itemCount)
        console.log("Item Count " + items.length)
        if (itemCount == items.length){
            itemCount=0;
        }
        selectedGift = items[itemCount];

        itemCount = itemCount + 1;   

        console.log("Selected Gift" + selectedGift.item);

        // Update UI with selected gift details
        itemName.innerText = selectedGift.item;
        itemLink.setAttribute('href', selectedGift.link);
        itemPrice.innerText= selectedGift.price;
        if (selectedGift.item == 'Amazon Voucher'){
            itemPrice.classList.remove("rupee-symbol");
        } else {
            itemPrice.classList.add("rupee-symbol"); 
        }
        itemLinkName.setAttribute('href', selectedGift.link);
        bannerImage.style.backgroundImage = `url('${selectedGift.image}')`;
        if (!instruction.classList.contains('hidden')){
            giftDetailsBody.classList.remove('hidden');
            textbox.classList.add('hidden');
            instruction.classList.add('hidden');
        }
    }, 1000);
}




// Function to show modal
function showModal(modal) {
    modal.classList.remove("hidden");
}

// Function to hide modal
function hideModal(modal) {
    modal.classList.add('hidden');
}
