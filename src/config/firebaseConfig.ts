// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
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
  measurementId: "G-756GWMNKVT",
};

// Initialize Firebase
let firebaseApp;
export let auth;
if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
  auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  firebaseApp = getApp();
  auth = getAuth(firebaseApp);
}

export default firebaseApp;

export const storeAuth = async (auth) => {
  try {
    const jsonValue = JSON.stringify(auth);
    await AsyncStorage.setItem("auth", jsonValue);
  } catch (e) {}
};
export const getUserAuth = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("auth");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
export const clearAuth = async () => {
  try {
    await AsyncStorage.removeItem("auth");
  } catch (e) {}
};
export const userdataaa = getUserAuth();

const storage = getStorage(firebaseApp, "gs://dubinhas.appspot.com");

export const activitiesStorage = ref(storage, "activities");
