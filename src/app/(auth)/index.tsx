import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";

import LoginForm from "components/Auth/Auth/Login/LoginForm";
import HeaderTitle from "components/HeaderTitle";

const { height: screenHeight } = Dimensions.get("window");

export default function LoginScreen() {
  return (
    <ImageBackground
      source={require("../../assets/images/BackgroundSinlgleActivites.png")}
      style={{ width: "100%", height: "100%", backgroundPosition: "cover" }}
    >
      <View style={styles.container}>
        <View style={styles.contentHeader}>
          <HeaderTitle
            title="Insira seus dados para logar!"
            subtitle="rápido, simples e seguro!"
          />
        </View>
        <LoginForm />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: "auto",
    maxWidth: 500,
    height: screenHeight,
    backgroundColor: "transparent",
  },

  contentHeader: {
    alignItems: "center",
    marginTop: 157,
    marginBottom: 61,
    backgroundColor: "transparent",
  },
});
