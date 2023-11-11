import React from "react";
import { StyleSheet } from "react-native";

import { users } from "../../mocked/studentes";
import CustomAvatatr from "../CustomAvatar/CustomAvatar";
import { View } from "../Themed";

import { Box } from "@gluestack-ui/themed";

const TopContainer = () => {
  return (
    <View style={styles.container}>
      <Box style={styles.card}>
        <CustomAvatatr index={0} item={users[0]} />
      </Box>
    </View>
  );
};

export default TopContainer;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
  },

  card: {
    width: "100%",
    backgroundColor: "#C3EBFF",
    minHeight: 200,
  },
});
