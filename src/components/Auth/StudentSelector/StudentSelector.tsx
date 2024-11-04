import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";

import { Link } from "expo-router";

import useFileUpload from "../../../helper/imageUploadHandler";
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
  const { img, name, id } = item;

  const { width: screenWidth } = Dimensions.get("window");
  const { getStorage } = useFileUpload();
  const [url, setUrl] = useState("");
  useEffect(() => {
    const fetchImage = async () => {
      const data = await getStorage(img);
      setUrl(data);
    };
    fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img]);
  return (
    <Link
      key={index}
      href={{
        pathname: "/home",
        params: { slug: id },
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
              uri: url || null,
            }}
          />
        </Avatar>
        <Text
          style={{
            fontSize: 27,
            maxWidth: screenWidth - 100,
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
