// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt3MJoaKaE3pdViK0FDf98DX-SY60w0cA",
  authDomain: "dubinhas.firebaseapp.com",
  projectId: "dubinhas",
  storageBucket: "dubinhas.appspot.com",
  messagingSenderId: "111037886929",
  appId: "1:111037886929:web:d36615b9a8c24e03d670f0",
  measurementId: "G-756GWMNKVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);