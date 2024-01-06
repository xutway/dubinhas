import {
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import PasswordInput from "../components/Auth/Login/PasswordInput";
import UsernameInput from "../components/Auth/Login/UsernameInput";
import HeaderTitle from "../components/HeaderTitle";
import { View } from "../components/Themed";

const { height: screenHeight } = Dimensions.get("window");

export default function LoginScreen() {
  const handleSubmit = () => {
    Alert.alert("Login realizado com sucesso!");
  };

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
        <View style={styles.loginView}>
          <UsernameInput placeholder="Digite o nome de usuário" />
          <View style={styles.separator} />
          <PasswordInput placeholder="Digite sua senha" />
          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contentHeader: {
    alignItems: "center",
    marginTop: 157,
    marginBottom: 61,
    backgroundColor: "transparent",
  },
  loginView: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    backgroundColor: "transparent",
  },
  loginButton: {
    backgroundColor: "#33BBFF",
    borderRadius: 30,
    height: 70,
    width: "70%",
    maxHeight: 500,
    marginTop: 50,
  },
  textButton: {
    marginTop: "auto",
    marginBottom: "auto",
    fontWeight: "bold",
    fontSize: 26,
    color: "#FFFFFF",
    textAlign: "center",
  },
  separator: {
    height: 31,
    width: "80%",
  },
  viewTop: {
    marginTop: "auto",
    marginBottom: "auto",
    maxHeight: Dimensions.get("window").height / 2,
  },
});
