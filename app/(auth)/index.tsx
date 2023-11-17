import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

import HeaderTitle from "../../components/HeaderTitle";
import StudentSelectorAvatar from "../../components/Auth/StudentSelector/StudentSelector";
import { View } from "../../components/Themed";
import { users } from "../../mocked/studentes";

import { Box } from "@gluestack-ui/themed";

const { width: screenWidth, height: screenHeith } = Dimensions.get("window");
export default function TabOneScreen() {
  useEffect(() => {
    Dimensions.addEventListener("change", () => {
      console.log("resize");
    });
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <HeaderTitle
        subtitle="Para entrar, role as bolhas até encontrar seu nome e rosto!"
        title="Olá Coleguinha!"
      />
      <Box style={styles.viewTop}>
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth > 500 ? 400 : screenWidth - 60}
          itemWidth={screenWidth > 500 ? 400 : screenWidth - 150}
          inactiveSlideShift={0}
          useScrollView
          data={users}
          renderItem={StudentSelectorAvatar}
          layoutCardOffset={10}
          layout="default"
          centerContent
        />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: screenHeith,
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
