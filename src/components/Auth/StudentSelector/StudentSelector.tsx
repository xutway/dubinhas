import React from "react";
import { Dimensions } from "react-native";

import { Link } from "expo-router";

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
    <Link
      key={index}
      href={{
        pathname: "/home",
        params: { slug: index },
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Avatar
          marginBottom={30}
          height={screenWidth - 100}
          width={screenWidth - 100}
          size="md"
          bgColor="$amber600"
          borderRadius="$full"
          style={{
            borderWidth: 4,
            borderColor: "#DBDBDB",
          }}
        >
          <AvatarFallbackText>{name}</AvatarFallbackText>
          <AvatarImage
            source={{
              height: screenWidth > 500 ? 500 : screenWidth - 150,
              width: screenWidth > 500 ? 500 : screenWidth - 150,
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
            color: "#000",
          }}
        >
          {name}
        </Text>
      </Box>
    </Link>
  );
};

export default StudentSelectorAvatar;
