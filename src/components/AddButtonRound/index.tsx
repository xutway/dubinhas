import { Pressable, StyleSheet, Text, View } from "react-native";

type AddButtonProps = {
  name: string;
  onPress: () => void;
};
const AddButton = ({ name, onPress }: AddButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles?.container}>
      <View style={styles?.button} onTouchEnd={() => onPress}>
        <Text style={styles?.plus}>+</Text>
      </View>
      <Text style={styles?.text}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  plus: {
    color: "#D9D9D9",
    fontSize: 40,
    fontWeight: "bold",
  },
  text: {
    color: "#000000",
  },
  button: {
    marginHorizontal: 10,
    borderRadius: 100,
    backgroundColor: "transparent",
    borderStyle: "dotted",
    borderWidth: 4,
    borderColor: "#D9D9D9",
    height: 125,
    width: 125,
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddButton;
