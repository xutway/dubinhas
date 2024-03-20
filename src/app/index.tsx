import React, { useEffect } from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";

import HeaderTitle from "components/HeaderTitle";
import ImageCard from "components/ImageCard";
import { router } from "expo-router";

import { auth } from "../config/firebaseConfig";

import { Box } from "@gluestack-ui/themed";

const { height: screenHeith } = Dimensions.get("window");
export default function WelcomeScreen() {
  useEffect(() => {
    Dimensions.addEventListener("change", () => {});
  }, []);

  const authed = auth.currentUser;

  return (
    <ImageBackground
      source={require("../assets/images/Background2.png")}
      style={{ width: "100%", height: "100%", backgroundPosition: "cover" }}
    >
      <View style={styles.separator} />
      <View style={styles.container}>
        <HeaderTitle
          subtitle="Gerenciador de tarefas didático"
          title="Bem Vindo ao Dubinhas!"
        />
        <ImageCard
          $width={150}
          $height={150}
          onPress={() =>
            router.push(authed ? "/teacherPage" : "/(auth)/loginScreen")
          }
          image={require("assets/images/Professor.png")}
          text="Professor \ Administrador"
        />
        <ImageCard
          $width={300}
          $height={150}
          onPress={() => router.push("/userSelector")}
          image={require("assets/images/student.png")}
          text="Aluno"
        />
        <Box style={styles.viewTop} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    height: screenHeith,
    backgroundColor: "transparent",
    gap: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    width: "80%",
    marginTop: 30,
    marginBottom: 100,
  },
  viewTop: {
    marginTop: "auto",
    marginBottom: "auto",
    maxHeight: screenHeith / 2,
  },
});
