import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    maxWidth: 400,
    gap: 20,
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
  formButtons: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 5,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "transparent",
    borderStyle: "dotted",
    borderWidth: 8,
    borderColor: "#D9D9D9",
    height: 200,
    width: "100%",
    flexDirection: "column",
  },
});
export default styles;
