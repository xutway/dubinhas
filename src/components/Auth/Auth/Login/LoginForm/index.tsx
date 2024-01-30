import { useForm } from "react-hook-form";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import PasswordInput from "components/Auth/Auth/Login/PasswordInput";
import UsernameInput from "components/Auth/Auth/Login/UsernameInput";
import { router } from "expo-router";

import { loginFormData, loginFormSchema } from "./types";

import { Button } from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting: isLoading, disabled },
  } = useForm<loginFormData>({
    shouldUnregister: true,

    resolver: zodResolver(loginFormSchema),
  });
  const onSubmit = async (data: any) => {
    router.push("/userSelector");
    reset(data);
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
      <PasswordInput
        errors={errors}
        control={control}
        name="password"
        placeholder="Digite sua senha"
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

export default LoginForm;

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
