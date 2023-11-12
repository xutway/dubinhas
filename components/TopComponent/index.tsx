import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";

import { users } from "../../mocked/studentes";
import { View } from "../Themed";

import { Avatar, AvatarImage, Box } from "@gluestack-ui/themed";

const { width: screenWidth } = Dimensions.get("window");

const TopContainer = ({ userID }: { userID: number }) => {
  const img = users[userID].img;
  const name = users[userID].name;

  return (
    <View style={styles.container}>
      <Box style={styles.card}>
        <Box sx={styles.box}>
         <Box style={styles.textBoxStart}><Text style={styles.text}>{name}</Text></Box>
          <Avatar
            style={{
              width: screenWidth / 3,
              height: screenWidth / 3,
              marginBottom: -40,
              borderColor: "#C3EBFF",
              marginLeft: "auto",
              marginRight: "auto",
              borderWidth: 10,
            }}
            bgColor="$amber600"
            size="lg"
            borderRadius="$full"
          >
            <AvatarImage
              source={{
                width: 200,
                height: 200,
                uri: img,
              }}
            />
          </Avatar>
          <Box style={styles.textBoxEnd}><Text style={styles.text}>41 12341-1515</Text></Box>
        </Box>
      </Box>
    </View>
  );
};

export default TopContainer;

const styles = StyleSheet.create({
  box: {
    display: "flex",
    width: "100%",
    alignItems: "flex-end",
    flexShrink: 0,
    paddingHorizontal: 10,

    flexDirection: "row",
  },
  container: {},

  card: {
    width: "100%",
    backgroundColor: "#C3EBFF",
    marginLeft: "auto",
    marginRight: "auto",
    // justifyContent: "center",

    alignContent: "center",
    flexDirection: "row",
    minHeight: 130,
  },
  text: {

    fontSize: 12,
    fontWeight: "bold",
  },
  textBoxStart:{
        width: screenWidth / 3,
        justifyContent: "center",
        display: "flex",
        alignItems: "flex-start",
  },
  textBoxEnd:{
    width: screenWidth / 3,
    justifyContent: "center",
    display: "flex",
    alignItems: "flex-end",
}

});
