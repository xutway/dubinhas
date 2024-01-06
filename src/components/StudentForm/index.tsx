import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-root-toast";

import { router } from "expo-router";

import { useCreateStudentMutation } from "../../features/student/mutation.generated";
import useFileUpload from "../../helper/imageUploadHandler";
import AvatarInput from "../AvatarInput";
import { IconType } from "../Icon/icon";
import TextInput from "../TextInput";
import styles from "./styles";

import { Button } from "@gluestack-ui/themed";

export default function StudentForm() {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting: isLoading },
  } = useForm({
    defaultValues: {
      phonew: "",
      name: "",
      avatarPath: null,
    },
    shouldUnregister: true,
  });
  const [createStudent, { loading }] = useCreateStudentMutation();
  const { imageUpload } = useFileUpload();
  const disableSubmit = isLoading || loading;
  const onSubmit = async (data: any) => {
    try {
      const avatarFile = getValues("avatarPath");

      const image = await imageUpload(avatarFile);

      createStudent({
        variables: {
          nickName: data.name,
          phone: data.phone,
          avatarPath: image,
        },
        onError: () => {
          Toast?.show(
            "Erro ao criar Aluno! Por favor revise os dados inseridos",
            {
              position: Toast.positions.TOP,
            },
          );
        },
        onCompleted: () => {
          setValue("avatarPath", null);
          reset();
        },
      });
    } catch (err) {}
  };

  return (
    <View style={styles.container}>
      <AvatarInput
        disabled={isLoading}
        name="avatarPath"
        control={control}
        onPick={(file) => {
          setValue("avatarPath", file?.assets, {
            shouldValidate: true,
          });
        }}
      />
      <TextInput
        children={<IconType name="user" size={15} color="#D9D9D9" />}
        disabled={isLoading}
        control={control}
        placeholder="Nome do aluno"
        name="name"
        errors={errors}
      />
      <TextInput
        children={<IconType name="phone" size={15} color="#D9D9D9" />}
        disabled={isLoading}
        control={control}
        placeholder="Telefone"
        name="phone"
        errors={errors}
      />

      <View style={styles.formButtons}>
        <Button
          isDisabled={isLoading}
          style={{
            backgroundColor: "#FF948D",
            borderColor: "#000",
            borderWidth: 1,
            borderRadius: 50,
            minWidth: 150,
          }}
          onPress={() => {
            router.push("/(auth)");
            reset();
          }}
        >
          <Text>Cancelar</Text>
        </Button>
        <Button
          isDisabled={disableSubmit}
          sx={{
            backgroundColor: "#9EE699",
            borderColor: "#000",
            borderWidth: 1,
            borderRadius: 50,
            minWidth: 150,
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text>Concluir</Text>
        </Button>
      </View>
    </View>
  );
}
