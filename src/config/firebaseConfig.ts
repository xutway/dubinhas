// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
  memoryLocalCache,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: "dubinhas.appspot.com",
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
let firebaseApp;
let firebaseAuth;
if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
  initializeFirestore(firebaseApp, {
    localCache: memoryLocalCache(),
  });
  firebaseAuth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  firebaseApp = getApp();
  firebaseAuth = getAuth(firebaseApp);
}

export const auth = firebaseAuth;
export const db = getFirestore(firebaseApp);

export default firebaseApp;

// Firebase storage
export const storage = getStorage(firebaseApp, "gs://dubinhas.appspot.com");
process.env.EXPO_PUBLIC_ENVOIRMENT === "dev" &&
  connectFirestoreEmulator(db, "192.168.1.22", 8080);

// Auth related functions
export const storeAuth = async (auth) => {
  try {
    const jsonValue = JSON.stringify(auth);
    await AsyncStorage.setItem("auth", jsonValue);
  } catch (e) {
    // handle error
  }
};

export const getUserAuth = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("auth");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // handle error
  }
};

export const clearAuth = async () => {
  try {
    await AsyncStorage.removeItem("auth");
  } catch (e) {
    // handle error
  }
};

export const userdataaa = getUserAuth();
