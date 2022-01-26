const {initializeApp} =require('firebase/app');

const firebaseConfig = {
  apiKey: "AIzaSyD2GjKPI4LwemmrdlTxTObCDS8iLRTO6ww",
  authDomain: "pultemsoft.firebaseapp.com",
  projectId: "pultemsoft",
  storageBucket: "pultemsoft.appspot.com",
  messagingSenderId: "935924857959",
  appId: "1:935924857959:web:066fd89c3406d946f628c2",
  measurementId: "G-14JSXKR72C"
};

// Initialize Firebase
const firebaseApp=initializeApp(firebaseConfig);
module.exports = firebaseApp;