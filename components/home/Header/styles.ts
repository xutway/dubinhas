import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
    box: {
      display: "flex",
      width: "100%",
      alignItems: "flex-end",
      flexShrink: 0,
      paddingHorizontal: 10,
      flexDirection: "row",
    },
  
    card: {
      width: "100%",
      backgroundColor: "#C3EBFF",
      marginLeft: "auto",
      marginRight: "auto",
      alignContent: "center",
      flexDirection: "row",
      minHeight: 130,
    },
  
    text: {
      fontSize: 12,
      fontWeight: "bold",
    },
  
    textBoxStart: {
      width: screenWidth / 3,
      justifyContent: "center",
      display: "flex",
      alignItems: "flex-start",
    },
  
    textBoxEnd: {
      width: screenWidth / 3,
      justifyContent: "center",
      display: "flex",
      alignItems: "flex-end",
    }
  
  });
  
export default styles;