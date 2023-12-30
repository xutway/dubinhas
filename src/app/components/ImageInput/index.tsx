import { Control, Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import {
  ImagePickerCanceledResult,
  ImagePickerSuccessResult,
} from "expo-image-picker";

type ImageInputProps = {
  onPick: (file: ImagePickerSuccessResult | ImagePickerCanceledResult) => void;
  control: Control<any>;
  name: string;
};

export default function ImageInput({ onPick, control, name }: ImageInputProps) {
  const getFile = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    }).then((file) => {
      onPick(file);
    });
  };

  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { value } }) => {
        console.log("🚀 ~ file: index.tsx:39 ~ ImageInput ~ value:", value);
        return (
          <>
            {value[0] ? (
              <Image
                style={styles?.image}
                source={{
                  uri: value[0]?.uri,
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
      }}
      name={name}
    />
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
