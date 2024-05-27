// const { initializeApp } = require('firebase/app');
// const { getFirestore } = require('firebase/firestore');

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

console.log("FirebaseConfig is starting")
const firebaseConfig = {
  apiKey: "AIzaSyBijH5_PLywNTNwvymHX0mS6HhxBP3V_n4",
  authDomain: "wedding-registry-815a5.firebaseapp.com",
  projectId: "wedding-registry-815a5",
  storageBucket: "wedding-registry-815a5.appspot.com",
  messagingSenderId: "748958953274",
  appId: "1:748958953274:web:a18eeea2ddc467bf76aa03",
  measurementId: "G-M5GY89T64X"
};

const app = initializeApp(firebaseConfig);

// // Initialize Firestore
const firestore = getFirestore(app);
console.log("FirebaseConfig is ended")
export{firestore};

// module.exports = {firestore};
