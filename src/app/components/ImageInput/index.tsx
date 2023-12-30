import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import {
  ImagePickerCanceledResult,
  ImagePickerSuccessResult,
} from "expo-image-picker";

type ImageInputProps = {
  onPick: (file: ImagePickerSuccessResult | ImagePickerCanceledResult) => void;
};

export default function ImageInput({ onPick }: ImageInputProps) {
  //
  const [file, setFile] = useState({} as ImagePickerSuccessResult);

  const getFile = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    }).then((file) => {
      setFile(file as ImagePickerSuccessResult);
      onPick(file);
    });
  };

  return (
    <>
      {file?.assets ? (
        <Image
          style={styles?.image}
          source={{
            uri: file?.assets[0]?.uri,
          }}
          onTouchEnd={getFile}
        />
      ) : (
        <View style={styles?.button} onTouchEnd={getFile}>
          <Text style={styles?.plus}>+</Text>
          <Text style={styles?.text}>Imagem Atividade</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: "100%",
    backgroundColor: "red",
  },
  plus: {
    color: "#D9D9D9",
    fontSize: 60,
    fontWeight: "bold",
  },
  text: {
    color: "#000",
    fontWeight: "200",
  },
  button: {
    backgroundColor: "transparent",
    borderStyle: "dotted",
    borderWidth: 8,
    borderColor: "#D9D9D9",
    height: 200,
    width: "100%",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
