import { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text } from "react-native";

import { EyeIcon, EyeOffIcon } from "lucide-react-native";

import { Input, InputField, InputIcon, InputSlot } from "@gluestack-ui/themed";

type PasswordInputProps = {
  placeholder?: string;
  name?: string;
  errors?: any;
  control?: any;
};

const PasswordInput = ({
  placeholder,
  control,
  name,
  errors,
}: PasswordInputProps) => {
  console.log("🚀 ~ file: index.tsx:22 ~ errors:", errors?.name);
  const [showPassword, setShowPassword] = useState(false);
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
              type={showPassword ? "text" : "password"}
            />
            <InputSlot pr="$3" onPress={() => setShowPassword(!showPassword)}>
              <InputIcon
                as={showPassword ? EyeIcon : EyeOffIcon}
                color="$darkBlue500"
              />
            </InputSlot>
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

export default PasswordInput;

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
