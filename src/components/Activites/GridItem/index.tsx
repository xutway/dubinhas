import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";

import useFileUpload from "../../../helper/imageUploadHandler";

import { Box, Pressable } from "@gluestack-ui/themed";

const GridItem = ({ item, onAdd, width }) => {
  const { getStorage } = useFileUpload();
  const [url, setUrl] = useState<string>("");
  const AddButon = item.name === "Adicionar Atividade";
  useEffect(() => {
    if (!item) return;
    const fetchImage = async () => {
      await getStorage(item.imageFile)
        .then((img) => {
          setUrl(img);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <Box
      sx={{
        width: width / 2.1,
        maxWidth: 400,
      }}
    >
      {AddButon ? (
        <Pressable onPress={onAdd} width="$full" style={StyledCard.container}>
          <Box width="$full" style={StyledCard.buttonContainer}>
            <Text style={StyledCard?.plus}>+</Text>
          </Box>
          <Box width="$full" style={StyledCard.textBox}>
            <Text style={StyledCard.textTitle}>{item.name}</Text>
            <Text style={StyledCard.textSubtitle}>{item.description}</Text>
          </Box>
        </Pressable>
      ) : (
        <ImageBackground
          source={{ uri: url || null }}
          style={StyledCard.container}
        >
          <Box style={StyledCard.textBox}>
            <Text style={StyledCard.textTitle}>{item.name}</Text>
            <Text style={StyledCard.textSubtitle}>{item.name}</Text>
          </Box>
        </ImageBackground>
      )}
    </Box>
  );
};

export default GridItem;

export const StyledCard = StyleSheet.create({
  container: {
    height: 122,
    overflow: "hidden",
    display: "flex",
    justifyContent: "flex-end",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    borderWidth: 6,
    position: "absolute",
    borderStyle: "dotted",
    borderColor: "#D9D9D9",
    display: "flex",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    height: 122,
  },
  plus: {
    color: "#D9D9D9",
    fontSize: 30,
    fontWeight: "bold",
  },

  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textSubtitle: {
    fontSize: 8,
    fontWeight: "600",
  },
  textBox: {
    backgroundColor: "#DBDBDB",
    height: 50,
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
});
