import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import ActivitesList from "../../components/ActivitesList";
import TopContainer from "../../components/TopComponent";
import { activites } from "../../mocked/studentes";

const { height: screenHeith } = Dimensions.get("window");
export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <TopContainer />
      <View style={styles.separator} />
      <ActivitesList title="Turno da Tarde" data={activites} />
    </View>
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
