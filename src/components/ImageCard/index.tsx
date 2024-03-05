import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { Image } from "expo-image";

interface ImageCardProps {
  text: string;
  image: any;
  $width?: number;
  $height?: number;
  onPress?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  text,
  image,
  $width,
  $height,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
      <Image
        style={{
          width: $width || 100,
          height: $height || 100,
        }}
        placeholder="assets/images/Loading.gif"
        source={image}
        alt="ImageCard"
      />
      <Text>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    borderWidth: 1,
    height: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
  },
  image: {},
});

export default ImageCard;
