import { Dimensions, StyleSheet } from "react-native";

const { width: scr } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    width: 122,
    height: 122,
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
    height: 50,
    width: 122,
    display: "flex",
    alignItems: "center",
    gap: 5,
  },

  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  textSubtitle: {
    fontSize: 8,
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
