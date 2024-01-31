import { StyleSheet } from "react-native";

import { SearchIcon } from "lucide-react-native";

import { Input, InputField, InputIcon, InputSlot } from "@gluestack-ui/themed";

type SearchInputProps = {
  placeholder: string;
  onChange: (text: string) => void;
};

const SearchInput = ({ onChange, placeholder }: SearchInputProps) => {
  return (
    <Input style={styles.input}>
      <InputField
        style={styles.inputField}
        onChangeText={(e) => onChange(e)}
        placeholder={placeholder}
        placeholderTextColor="#000000"
      />

      <InputSlot pr="$3">
        <InputIcon style={styles.icon} as={SearchIcon} />
      </InputSlot>
    </Input>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F6F5F5",
    borderRadius: 50,
    alignItems: "center",
    color: "#000000",
    borderColor: "#000000",
  },
  inputField: {
    backgroundColor: "#F6F5F5",
    fontWeight: "200",
    color: "#000000",
  },
  InputSlot: {
    color: "#000000",
    backgroundColor: "#F6F5F5",
  },
  icon: {
    fontSize: 18,
    color: "#D9D9D9",
  },
});
