import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import { Image } from "expo-image";

import ActivityForm from "./components/createActivity/activityForm";

import { KeyboardAvoidingView } from "@gluestack-ui/themed";

export default function CreateActivityScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/BackgroundForm.png")}
      style={{ width: "100%", height: "100%", backgroundPosition: "cover" }}
    >
      <View style={styles.container}>
        <View style={styles.separator} />
        <View style={styles.formContainer}>
          <ActivityForm />
        </View>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={{ flex: 1, zIndex: 999 }}
      >
        <Image
          style={styles?.image}
          contentFit="fill"
          placeholder="assets/images/Loading.gif"
          source={require("assets/images/childrenRope.png")}
          alt="KidsPlaying"
        />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  image: {
    bottom: 0,
    position: "absolute",
    width: "100%",
    minHeight: 200,
  },
});
