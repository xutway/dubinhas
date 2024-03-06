import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-root-toast";

import { router } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

import { db } from "../../../config/firebaseConfig";
import useFileUpload from "../../../helper/imageUploadHandler";
import ImageInput from "../../ImageInput";
import TextAreaInput from "../../TextAreaInput";
import TextInput from "../../TextInput";
import VideoInput from "../../VideoInput";
import styles from "./styles";

import { Button } from "@gluestack-ui/themed";

export default function ActivityForm() {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting: isLoading },
  } = useForm({
    defaultValues: {
      description: "",
      name: "",
      imageFile: {} as any,
      videoFile: {} as any,
    },
    shouldUnregister: true,
  });

  const { imageUpload } = useFileUpload();
  const baseURL = process.env.EXPO_PUBLIC_FIREBASE_BUCKET;
  const onSubmit = async (data: any) => {
    try {
      const avatarFile = getValues("imageFile");
      const videoFile = getValues("videoFile");

      if (
        Object.keys(avatarFile).length === 0 ||
        Object.keys(videoFile).length === 0
      ) {
        Toast?.show("Selecione um video e uma imagem", {
          position: Toast.positions.TOP,
        });
        return;
      }

      const storage = getStorage();
      const activitiesStorage = ref(storage, "files/");

      const image = await imageUpload(
        activitiesStorage,
        avatarFile,
        "activities",
      );
      const video = await imageUpload(
        activitiesStorage,
        videoFile,
        "activities",
      );
      if (image && video) {
        await addDoc(collection(db, "activities"), {
          description: data.description,
          name: data.name,
          videoFile: baseURL + "/" + video.fullPath,
          imageFile: baseURL + "/" + image.fullPath,
        });
      }
      Toast?.show("Atividade criada com sucesso!", {
        position: Toast.positions.TOP,
      });
    } catch (error) {
      Toast?.show("Erro ao criar atividade. Por favor, tente novamente.", {
        position: Toast.positions.TOP,
      });
    }
    reset();
    router.push("/teacherPage");
  };

  return (
    <View style={styles.container}>
      <ImageInput
        disabled={isLoading}
        name="imageFile"
        control={control}
        onPick={(file) => {
          setValue("imageFile", file?.assets, {
            shouldValidate: false,
          });
        }}
      />
      <TextInput
        disabled={isLoading}
        control={control}
        placeholder="Nome da atividade"
        name="name"
        errors={errors}
      />
      <TextAreaInput
        disabled={isLoading}
        placeholder="Breve descrição da atividade"
        control={control}
        name="description"
        errors={errors}
      />
      <VideoInput
        disabled={isLoading}
        name="videoFile"
        control={control}
        onPick={(file) =>
          setValue("videoFile", file?.assets, {
            shouldValidate: false,
          })
        }
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
          }}
          onPress={() => {
            router.push("/teacherPage");
            reset();
          }}
        >
          <Text>Cancelar</Text>
        </Button>
        <Button
          isDisabled={isLoading}
          sx={{
            backgroundColor: "#9EE699",
            borderColor: "#000",
            borderWidth: 1,
            borderRadius: 50,
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
