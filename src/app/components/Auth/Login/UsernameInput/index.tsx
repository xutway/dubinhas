import { useState } from "react";
import { StyleSheet } from "react-native";

import { AliasesProps, Input, InputField } from "@gluestack-ui/themed";

type UsernameInputProps = {
  placeholder?: string;
} & AliasesProps;

const UsernameInput = ({ placeholder }: UsernameInputProps) => {
  const [username, setUsername] = useState("");
  return (
    <Input style={styles.loginItems}>
      <InputField
        placeholder={placeholder}
        value={username}
        onChangeText={setUsername}
      />
    </Input>
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
