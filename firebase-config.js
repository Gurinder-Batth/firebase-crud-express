// Import the functions you need from the SDKs you need
const firebase =  require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyCqwsjOxlgFMfjJsadRDfM5rbubs68QKOA",
  authDomain: "fir-app-83531.firebaseapp.com",
  projectId: "fir-app-83531",
  storageBucket: "fir-app-83531.appspot.com",
  messagingSenderId: "1024031759214",
  appId: "1:1024031759214:web:937f66dac2aff9e7e47f7f"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
module.exports = db