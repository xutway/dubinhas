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
    fontSize: 14,
    fontWeight: "600",
  },

  mainTitle: {
    color: "#000",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
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
