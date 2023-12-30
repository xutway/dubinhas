import { useState } from "react";
import { Control, Controller } from "react-hook-form";

import * as ImagePicker from "expo-image-picker";
import {
  ImagePickerCanceledResult,
  ImagePickerSuccessResult,
} from "expo-image-picker";

import { Input, InputField } from "@gluestack-ui/themed";

type ImageInputProps = {
  onPick: (file: ImagePickerSuccessResult | ImagePickerCanceledResult) => void;
  control: Control<any>;
  name: string;
};

export default function VideoInput({ onPick, control, name }: ImageInputProps) {
  const [fileName, setFileName] = useState({} as ImagePickerSuccessResult);

  const getFile = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
    }).then((file) => {
      setFileName(file as ImagePickerSuccessResult);
      onPick(file);
    });
  };

  const filePlaceHolder = fileName?.assets
    ? "Video.MP4"
    : "Video Demonstrativo (MP4. MOV. Etc)";

  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { value } }) => (
        <Input
          variant="outline"
          isReadOnly
          style={{
            borderColor: "#000000",
            borderRadius: 50,
          }}
          onTouchEnd={getFile}
        >
          <InputField
            value={value[0]?.uri}
            style={{
              fontSize: 14,
              color: "#000",
              fontWeight: "200",
              width: "100%",
              backgroundColor: "#F6F5F5",
            }}
            placeholderTextColor="#000"
            placeholder={filePlaceHolder as string}
          />
        </Input>
      )}
      name={name}
    />
  );
}
