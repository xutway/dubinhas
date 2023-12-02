import React from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import ActivitesList from "../components/Activites/ActivitesList";
import Header from "../components/home/Header";
import { activites } from "../mocked/studentes";

const { height: screenHeith } = Dimensions.get("window");
export default function TabOneScreen() {
  const { slug } = useLocalSearchParams();
  return (
    <ImageBackground
      source={require("../../assets/images/BackgroundActivites.png")}
      style={{ width: "100%", height: "100%", backgroundPosition: "cover" }}
    >
      <View style={styles.container}>
        <Header userID={parseInt(slug.toString())} />
        <View style={styles.separator} />
        <ActivitesList
          title="Turno da Tarde"
          // @ts-ignore
          data={activites}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: screenHeith,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
