
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

import * as rtdb from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDv5qUNSsXsilVUTuEKyg2p4_i9mxc1Lj4",
    authDomain: "discordserver-95266.firebaseapp.com",
    databaseURL: "https://discordserver-95266-default-rtdb.firebaseio.com",
    projectId: "discordserver-95266",
    storageBucket: "discordserver-95266.appspot.com",
    messagingSenderId: "436800369751",
    appId: "1:436800369751:web:3a10ccd660d726757b1f12"
  };

  // add a comment

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Connects Javascript code to firebase discord app
// Any real-time change to firebase discord app should pop up Javascript alert
// Right now it should be very basic same as last Monday's class
let db = rtdb.getDatabase(app);
let titleRef = rtdb.ref(db, "/");
rtdb.onValue(titleRef, ss=>{
  alert(JSON.stringify(ss.val()));
});
