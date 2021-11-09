import app from 'firebase/app';
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyApj5cBmWMdi7V1cOnPIO5wPtTFUg6quAU",
  authDomain: "reactnavigation-3e9f4.firebaseapp.com",
  projectId: "reactnavigation-3e9f4",
  storageBucket: "reactnavigation-3e9f4.appspot.com",
  messagingSenderId: "126137232481",
  appId: "1:126137232481:web:2399c9a52bd91bc00d0e20"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();

