import { Dimensions, StyleSheet } from "react-native";

const { width: scr } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    borderRadius: 41,
    marginHorizontal: 10,
    overflow: "hidden",
    display: "flex",
    justifyContent: "flex-end",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "transparent",
  },
  borders: {
    borderWidth: 6,
    position: "absolute",
    borderStyle: "dotted",
    borderColor: "#D9D9D9",
    width: 250,
    height: 250,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 41,
  },
  textBox: {
    backgroundColor: "#DBDBDB",
    height: 100,
    display: "flex",
    alignItems: "flex-start",
    paddingLeft: 30,
    gap: 5,
  },

  textTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },

  textSubtitle: {
    fontSize: 15,
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  plus: {
    color: "#D9D9D9",
    paddingBottom: 50,
    fontSize: 60,
    fontWeight: "bold",
  },

  button: {
    width: scr / 1.4,
    height: 50,
    fontWeight: "500",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#000",
    backgroundColor: "#FF948D",
    position: "sticky",
    bottom: "-100%",
  },

  buttonTextStyle: {
    color: "#000",
    fontSize: 24,
  },
});
