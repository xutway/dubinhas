import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import TopContainer from "../../components/TopComponent";

const { height: screenHeith } = Dimensions.get("window");
export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <TopContainer />
      <View
        style={styles.separator}
        // lightColor="#eee"
        // darkColor="rgba(255,255,255,0.1)"
      />
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
