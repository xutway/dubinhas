import { useState } from "react";
import { StyleSheet } from "react-native";

import { EyeIcon, EyeOffIcon } from "lucide-react-native";

import {
  AliasesProps,
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "@gluestack-ui/themed";

type PasswordInputProps = {
  placeholder?: string;
} & AliasesProps;

const PasswordInput = ({ placeholder }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input style={styles.loginItems}>
      <InputField
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
      />
      <InputSlot pr="$3" onPress={() => setShowPassword(!showPassword)}>
        <InputIcon
          as={showPassword ? EyeIcon : EyeOffIcon}
          color="$darkBlue500"
        />
      </InputSlot>
    </Input>
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
