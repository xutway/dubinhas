import React from "react";
import { Control, Controller } from "react-hook-form";
import { Text } from "react-native";

import { Box, Input, InputField } from "@gluestack-ui/themed";

type TextInputProps = {
  control: Control<any>;
  placeholder: string;
  name: string;
  errors: any;
  maxLength?: number;
  disabled?: boolean;
  children?: React.ReactNode;
};

export default function TextInput({
  placeholder,
  control,
  errors,
  children,
  name,
  maxLength,
  disabled,
}: TextInputProps) {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Box>
          <Input
            variant="outline"
            style={{
              backgroundColor: "#F6F5F5",
              borderColor: errors?.name ? "red" : "#000000",
              borderRadius: 50,
              alignItems: "center",
              paddingLeft: children ? 20 : 0,
            }}
            isDisabled={disabled}
          >
            {children && children}
            <InputField
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              style={{
                fontSize: 14,
                color: "#000",
                fontWeight: "200",
                width: "100%",
                backgroundColor: "#F6F5F5",
              }}
              maxLength={maxLength}
              placeholderTextColor="#000"
              placeholder={placeholder}
            />
          </Input>
          {errors[name] && (
            <Text style={{ paddingLeft: 10, color: "red", fontSize: 12 }}>
              {errors[name].message}
            </Text>
          )}
        </Box>
      )}
      name={name}
    />
  );
}
