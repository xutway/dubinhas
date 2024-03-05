import { useForm } from "react-hook-form";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-root-toast";

import PasswordInput from "components/Auth/Auth/Login/PasswordInput";
import UsernameInput from "components/Auth/Auth/Login/UsernameInput";
import { router } from "expo-router";
import { updateProfile } from "firebase/auth";

import { auth } from "../../../../../config/firebaseConfig";
import { registerFormData, registerFormSchema } from "./types";

import "firebase/firestore";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { Button } from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting: isLoading, disabled },
  } = useForm<registerFormData>({
    shouldUnregister: true,

    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: data.username,
        });
        Toast?.show("Usuário criado com sucesso!", {
          position: Toast.positions.TOP,
        });
        router.push("/(auth)/");
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          Toast?.show("Erro ao criar usuário! Email já cadastrado", {
            position: Toast.positions.TOP,
          });
          return;
        }
        Toast?.show(
          "Erro ao criar usuário! Por favor revise os dados inseridos",
          { position: Toast.positions.TOP },
        );
      });
    reset(data);
    router.push("/(auth)/");
  };

  return (
    <View style={styles.loginView}>
      <UsernameInput
        control={control}
        errors={errors}
        name="username"
        placeholder="Digite o nome de usuário"
      />
      <View style={styles.separator} />
      <UsernameInput
        control={control}
        errors={errors}
        name="email"
        placeholder="Digite seu email"
      />
      <View style={styles.separator} />
      <PasswordInput
        errors={errors}
        control={control}
        name="password"
        placeholder="Digite sua senha"
      />
      <View style={styles.separator} />
      <PasswordInput
        errors={errors}
        control={control}
        name="passwordConfirmation"
        placeholder="Confirme sua senha"
      />
      <Button
        isDisabled={isLoading || disabled}
        style={styles.loginButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.textButton}>Login</Text>
      </Button>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  loginView: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
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
