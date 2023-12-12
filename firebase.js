// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "#########",
    authDomain: "#########",
    databaseURL: "#########",
    projectId: "#########",
    storageBucket: "#########",
    messagingSenderId: "#########",
    appId: "#########",
    measurementId: "#########"
  };

// Initialize Firebase
let app;
app = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export { auth };
