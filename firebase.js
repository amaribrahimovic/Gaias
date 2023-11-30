// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDklhVrfn5Cp36BufQJDAW1gFjxYomiUpQ",
    authDomain: "gaia-e0d22.firebaseapp.com",
    databaseURL: "https://gaia-e0d22-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gaia-e0d22",
    storageBucket: "gaia-e0d22.appspot.com",
    messagingSenderId: "663868469898",
    appId: "1:663868469898:web:5222b5a591e1e87258f373",
    measurementId: "G-BFQ5JDR22X"
  };

// Initialize Firebase
let app;
app = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export { auth };