importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyDtWmHBfmDSMu8slmlMHrjdMSekwGEn9GQ",
    authDomain: "pizzatwilio.firebaseapp.com",
    databaseURL: "https://pizzatwilio.firebaseio.com",
    projectId: "pizzatwilio",
    storageBucket: "pizzatwilio.appspot.com",
    messagingSenderId: "603360306030"
  });
const messaging = firebase.messaging();// start service worker