import React from "react";
import { Dimensions } from "react-native";

import { AvatarType } from "./types";

import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Text,
} from "@gluestack-ui/themed";

const StudentSelectorAvatar = ({
  item,
  index,
}: {
  item: AvatarType;
  index: number;
}) => {
  const { img, name } = item;
  const { width: screenWidth } = Dimensions.get("window");

  return (
    <Box
      key={index}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Avatar
        marginBottom={30}
        height={screenWidth - 150}
        width={screenWidth - 150}
        size="md"
        bgColor="$amber600"
        borderRadius="$full"
      >
        <AvatarFallbackText>{name}</AvatarFallbackText>
        <AvatarImage
          source={{
            height: screenWidth - 20,
            width: screenWidth - 20,
            uri: img,
          }}
        />
      </Avatar>
      <Text
        style={{
          fontSize: 27,
          height: 50,
          lineHeight: 50,
          fontWeight: "600",
        }}
      >
        {name}
      </Text>
    </Box>
  );
};

export default StudentSelectorAvatar;
