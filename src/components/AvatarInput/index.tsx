import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import {
  ImagePickerCanceledResult,
  ImagePickerSuccessResult,
} from "expo-image-picker";

import { Spinner } from "@gluestack-ui/themed";

type AvatarInputProps = {
  onPick: (file: ImagePickerSuccessResult | ImagePickerCanceledResult) => void;
  control: Control<any>;
  name: string;
  disabled?: boolean;
  loading?: boolean;
};

export default function AvatarInput({
  onPick,
  control,
  name,
  disabled,
  loading,
}: AvatarInputProps) {
  const [picking, setpicking] = useState(false);
  const getFile = async () => {
    setpicking(true);
    if (disabled) return;
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    }).then((file) => {
      setpicking(false);
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
        return (
          <View
            style={{
              minHeight: 130,
            }}
          >
            {value && value[0] ? (
              <View style={styles?.container}>
                <Image
                  style={styles?.image}
                  source={{
                    uri: value[0]?.uri,
                  }}
                  onTouchEnd={getFile}
                />
              </View>
            ) : (
              <View style={styles?.container}>
                <View style={styles?.button} onTouchEnd={getFile}>
                  <Text style={styles?.plus}>
                    {loading || picking ? <Spinner size="large" /> : "+"}
                  </Text>
                </View>
                <Text style={styles?.text}>Imagem Aluno</Text>
              </View>
            )}
          </View>
        );
      }}
      name={name}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: "red",
    marginBottom: "auto",
  },
  plus: {
    color: "#D9D9D9",
    fontSize: 40,
    fontWeight: "bold",
  },
  text: {
    color: "#000",
    fontWeight: "200",
  },
  button: {
    borderRadius: 100,
    backgroundColor: "transparent",
    borderStyle: "dotted",
    borderWidth: 4,
    borderColor: "#D9D9D9",
    height: 100,
    width: 100,
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});
