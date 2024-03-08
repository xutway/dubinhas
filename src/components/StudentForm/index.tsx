import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-root-toast";

import { router } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

import { db } from "../../config/firebaseConfig";
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
  const { imageUpload } = useFileUpload();
  const disableSubmit = isLoading;
  const baseURL = process.env.EXPO_PUBLIC_FIREBASE_BUCKET;
  const onSubmit = async (data: any) => {
    try {
      const avatarFile = getValues("avatarPath");
      const storage = getStorage();
      const studentStorage = ref(storage, "files/");
      const image = await imageUpload(studentStorage, avatarFile, "students");
      if (!image) {
        Toast?.show("Selecione uma imagem", {
          position: Toast.positions.TOP,
        });
        return;
      }
      await addDoc(collection(db, "student"), {
        name: data.name,
        phone: data.phone,
        img: baseURL + "/" + image.fullPath,
      });
      Toast?.show("Aluno cadastrado com sucesso", {
        position: Toast.positions.TOP,
      });
      reset();
      router.push("/teacherPage");
    } catch (err) {
      Toast?.show("Erro ao cadastrar aluno", {
        position: Toast.positions.TOP,
      });
    }
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
            minWidth: 130,
            width: "auto",
          }}
          onPress={() => {
            router.back();
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
            width: "auto",
            minWidth: 130,
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text>Concluir</Text>
        </Button>
      </View>
    </View>
  );
}
