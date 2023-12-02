import React from "react";
import { Dimensions, Text } from "react-native";

import { users } from "../../../mocked/studentes";
import { View } from "../../Themed";
import styles from "./styles";

import { Avatar, AvatarImage, Box } from "@gluestack-ui/themed";

const { width: screenWidth } = Dimensions.get("window");

const Header = ({ userID }: { userID: number }) => {
  const img = users[userID].img;
  const name = users[userID].name;

  return (
    <View>
      <Box style={styles.card}>
        <Box sx={styles.box}>
          <Box style={styles.textBoxStart}>
            <Text style={styles.text}>{name}</Text>
          </Box>
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
          <Box style={styles.textBoxEnd}>
            <Text style={styles.text}>41 12341-1515</Text>
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default Header;
