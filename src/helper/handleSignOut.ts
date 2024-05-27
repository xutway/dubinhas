import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";
import { signOut } from "firebase/auth";

import { auth } from "../config/firebaseConfig";

export const HandleSignout = () => {
  const signOutUser = async () => {
    const authUser = auth;

    signOut(authUser)
      .then(() => {
        AsyncStorage.clear()
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            console.error("Failed to clear AsyncStorage:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to sign out:", error);
      });
  };
  return {
    signOutUser,
  };
};
