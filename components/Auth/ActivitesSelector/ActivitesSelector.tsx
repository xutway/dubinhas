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
import HeaderTitle from "../../HeaderTitle";
const { width: screenWidth } = Dimensions.get("window");
const ActivitesSelector = ({
  item,
  index,
  routeParam,

}: {
  item: AvatarType;
  index: number;
  routeParam?: string;
 
}) => {
const param = item?.routeParam as string;
console.log("🚀 ~ file: ActivitesSelector.tsx:28 ~ param:", param)

  const { img, name, } = item;


  return (
    <Link
      href={{
        pathname:`/${item?.path}`,
        params: { slug: item?.routeParam },
      }}
    >
      <Box
        key={index}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Avatar
          marginBottom={30}
          height={screenWidth > 500 ? 400 : screenWidth - 150}
          width={screenWidth > 500 ? 400 : screenWidth - 150}
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
          backgroundColor="transparent"
            source={{
              height: screenWidth > 500 ? 500 : screenWidth - 150,
              width: screenWidth > 500 ? 500 : screenWidth - 150,
              uri: img,
              
            }}
          />
        </Avatar>
        <HeaderTitle title={name} subtitle={item?.subtitle} />
      </Box>
    </Link>
  );
};

export default ActivitesSelector;
