import React from "react";

import { Link } from "expo-router";

import { AvatarType } from "./types";

import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Text,
} from "@gluestack-ui/themed";

const AvatarComponent = ({
  item,
  index,
  size,
}: {
  item: AvatarType;
  index: number;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}) => {
  const { img, name } = item;

  return (
    <Link
      href={{
        pathname: "/home",
        params: { slug: index },
      }}
    >
      <Box
        key={index}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Avatar
          size={size || "md"}
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
              uri: img,
            }}
          />
        </Avatar>
        <Text
          size={size || "md"}
          style={{
            fontSize: 12,
            height: 50,
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

export default AvatarComponent;
