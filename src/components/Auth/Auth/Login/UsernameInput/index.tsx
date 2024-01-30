import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text } from "react-native";

import { Input, InputField } from "@gluestack-ui/themed";

type UsernameInputProps = {
  name?: string;
  placeholder?: string;
  control: any;
  errors?: any;
};

const UsernameInput = ({
  placeholder,
  control,
  name,
  errors,
}: UsernameInputProps) => {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, value, disabled } }) => (
        <>
          <Input isDisabled={disabled} style={styles.loginItems}>
            <InputField
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
            />
          </Input>
          {errors[name] && (
            <Text style={{ color: "red", fontSize: 12 }}>
              {errors[name].message}
            </Text>
          )}
        </>
      )}
      name={name}
    />
  );
};

export default UsernameInput;

const styles = StyleSheet.create({
  loginItems: {
    borderWidth: 1,
    borderRadius: 25,
    borderStyle: "solid",
    borderColor: "#000000",
    backgroundColor: "#F6F5F5",
    height: 44,
    width: "70%",
    maxWidth: 500,
  },
});
