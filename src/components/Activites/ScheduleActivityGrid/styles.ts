import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");
export const StyledCard = StyleSheet.create({
  container: {
    height: 122,
    overflow: "hidden",
    display: "flex",
    justifyContent: "flex-end",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    borderWidth: 6,
    position: "absolute",
    borderStyle: "dotted",
    borderColor: "#D9D9D9",
    display: "flex",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    height: 122,
  },
  plus: {
    color: "#D9D9D9",
    fontSize: 30,
    fontWeight: "bold",
  },

  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textSubtitle: {
    fontSize: 8,
    fontWeight: "600",
  },
  textBox: {
    backgroundColor: "#DBDBDB",
    height: 50,
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
});

export const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    width: 150,
    height: 100,
    backgroundColor: "blue",
  },
  wrapper: {
    width: "100%",
    height: "80%",
    maxHeight: 400,
    justifyContent: "center",
  },
  item: {
    width: "100%",
    height: 500,
    display: "flex",
    borderRadius: 8,
    backgroundColor: "red",
  },
  item_text: {
    fontSize: 40,
    color: "#FFFFFF",
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    bottom: height / 10,
  },
});
