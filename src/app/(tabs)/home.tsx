import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { LogOut } from "lucide-react-native";

import ActivitesList from "../../components/Activites/ActivitesList";
import Header from "../../components/home/Header";
import { activites } from "../../mocked/studentes";

import { Box, Button, ScrollView } from "@gluestack-ui/themed";

const { height: screenHeith } = Dimensions.get("window");
export default function TabOneScreen() {
  const { slug } = useLocalSearchParams();
  return (
    <ImageBackground
      source={require("../../assets/images/BackgroundActivites.png")}
      style={{ width: "100%", height: "100%", backgroundPosition: "cover" }}
    >
      <ScrollView scrollEnabled style={styles.container}>
        <Header userID={parseInt(slug?.toString()) ?? 1} />
        <View style={styles.separator} />
        <ActivitesList
          title="Turno da Manhã"
          // @ts-ignore
          data={activites}
        />
        <ActivitesList
          title="Turno da Tarde"
          // @ts-ignore
          data={activites}
        />
        <ActivitesList
          title="Turno da Noite"
          // @ts-ignore
          data={activites}
        />
      </ScrollView>
      <Box style={styles.buttonContainer}>
        <Button onTouchEnd={() => router.back()} style={styles.button}>
          <LogOut color="#000" size={30} />
          <Text style={styles.buttonTextStyle}>SAIR</Text>
        </Button>
      </Box>
    </ImageBackground>
  );
}
const { width: scr } = Dimensions.get("window");

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
  buttonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  button: {
    width: scr / 1.4,
    height: 50,
    fontWeight: "500",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#000",
    backgroundColor: "#FF948D",
    position: "sticky",
    bottom: 30,
  },

  buttonTextStyle: {
    color: "#000",
    fontSize: 24,
  },
});
