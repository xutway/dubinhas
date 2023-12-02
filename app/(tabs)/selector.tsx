import React, { useState } from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import Header from "../../components/home/Header";
import Carousel from "react-native-snap-carousel";
import ActivitesSelector from "../../components/Auth/ActivitesSelector/ActivitesSelector";
import { Box } from "@gluestack-ui/themed";

const { width: screenWidth, height: screenHeith } = Dimensions.get("window");





export default function TabMenuScreen() {

  const { slug } = useLocalSearchParams();
  console.log("aaaaaaaa",slug)
  const routes = [
    {
      id: 1,
      name: "Fala Para Escrita",
      img: "https://i.imgur.com/vanuz0r.png",
      subtitle: "Atividade educativa onde você pode ver suas tarefas diarias!",
      routeParam:slug.toString()
    },
    {
      id: 2,
      name: "Menu",
      path: "home",
      img: "https://i.imgur.com/IqCxUUG.png",
      subtitle: "Tudo que for dito ao redor será escrito automaticamente para você",
      routeParam:slug.toString()
    },

  ];
  console.log(routes)

  return (
    <View style={styles.container}>
      <Header userID={parseInt(slug.toString())} />
      <View style={styles.separator} />
      <Box style={styles.viewTop}>
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth > 500 ? 400 : screenWidth - 60}
          itemWidth={screenWidth > 500 ? 400 : screenWidth - 150}
          inactiveSlideShift={0}
          useScrollView
          data={routes}
          renderItem={ActivitesSelector}
          layoutCardOffset={11}
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
  viewTop: {
    marginTop: "auto",
    marginBottom: "auto",
    maxHeight: screenHeith / 2,
  },
});
