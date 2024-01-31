import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import { Image } from "expo-image";

import StudentForm from "../components/StudentForm";

import { KeyboardAvoidingView } from "@gluestack-ui/themed";

export default function CreateStudentcreen() {
  return (
    <ImageBackground
      source={require("../assets/images/BackgroundForm.png")}
      style={{ width: "100%", height: "100%", backgroundPosition: "cover" }}
    >
      <View style={styles.container}>
        <View style={styles.separator} />
        <View style={styles.formContainer}>
          <StudentForm />
        </View>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={{ flex: 1, zIndex: 999 }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles?.image}
            contentFit="fill"
            placeholder="assets/images/Loading.gif"
            source={require("assets/images/CreateStudentImage.png")}
            alt="KidsPlaying"
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 30,
    maxWidth: 400,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  imageContainer: {
    bottom: 10,
    minHeight: 200,
    position: "absolute",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "100%",
    maxWidth: 300,
    minHeight: 200,
  },
});
