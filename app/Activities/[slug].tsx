import * as React from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, View } from "react-native";

import { ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import { activites } from "../../mocked/studentes";

import {
  Box,
  Button,
  Input,
  InputField,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";

const { width: screenWidth } = Dimensions.get("window");
const Activites = () => {
  const { slug } = useLocalSearchParams();

  const newSlug = parseInt(slug.toString());

  return (
    <ImageBackground source={require("../../assets/images/BackgroundSinlgleActivites.png")} style={{width: '100%', height: '100%',backgroundPosition:"cover"}}>
    <View style={styles.container}>
      <View style={styles.separator} />
      <View style={styles.body}>
        <Image
          style={styles.image}
          source={{ uri: activites[newSlug]?.img }}
          alt={activites[newSlug]?.name}
          placeholder="../assets/images/Loading.gif"
          contentFit="fill"
        />
        <Video
          posterStyle={styles.videoPoster}
          videoStyle={styles.video}
          source={{ uri: activites[newSlug]?.video }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
          usePoster
          posterSource={require("../../assets/images/Loading.svg")}
          useNativeControls={false}
          style={styles.video}
        />
        <Input
          variant="outline"
          isDisabled={false}
          isInvalid={false}
          isReadOnly
          style={{
            borderColor: "#000000",
            borderRadius: 50,
            marginVertical: 20,
          }}
        >
          <InputField
            style={{
              fontSize: 14,
              color: "#000",
              fontWeight: "200",
              width: "100%",
            }}
            placeholderTextColor="#000"
            placeholder={activites[newSlug]?.name}
          />
        </Input>

        <Textarea
          isReadOnly
          isInvalid={false}
          isDisabled={false}
          style={{
            borderColor: "#000000",
            borderRadius: 20,
            marginVertical: 20,
            width: "100%",
        
          }}
          w="$64"
        >
          <TextareaInput
            style={{ fontSize: 14, color: "#000", fontWeight: "200" }}
            placeholderTextColor="#000"
            placeholder={activites[newSlug]?.description}
          />
        </Textarea>
      </View>
      <Box style={styles.buttonContainer}>
        <Button onTouchEnd={() => router.back()} style={styles.button}>
          <ArrowLeft color="#000" size={20} />
          <Text style={styles.buttonTextStyle}>Voltar</Text>
        </Button>
      </Box>
    </View>
    </ImageBackground>
  );
};
export default Activites;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  body: {
    width: screenWidth - 100,
    marginHorizontal: 20,
    maxWidth: 400,
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderWidth: 5,
    borderColor: "#DBDBDB",
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: 200,
    borderWidth: 5,
    borderColor: "#DBDBDB",
  },
  videoPoster: {
    width: "100%",
    height: 200,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  button: {
    width: screenWidth / 1.4,
    height: 50,
    maxWidth: 400,
    fontWeight: "500",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#FF948D",
    position: "sticky",
    bottom: -40,
    display: "flex",
    justifyContent: "flex-start",
  },
  buttonTextStyle: {
    color: "#000",
    fontSize: 14,
  },
});
