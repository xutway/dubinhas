import React, { useEffect, useState } from "react";

import { Link } from "expo-router";

import useFileUpload from "../../helper/imageUploadHandler";
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
  scheduleId,
}: {
  item: AvatarType;
  index: number;
  scheduleId?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}) => {
  const { img, name, id } = item;
  const { getStorage } = useFileUpload();
  const [url, setUrl] = useState<string>("");

  const handleImage = async () => {
    await getStorage(img)
      .then((data) => {
        setUrl(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <Link
      href={{
        pathname: "/home",
        params: { slug: id, ...(scheduleId && { scheduleId }) },
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
              uri: url || null,
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
