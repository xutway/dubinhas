import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-root-toast";

import { router } from "expo-router";

import useFileUpload from "../../../../helper/imageUploadHandler";
import { useInsertNewActivityMutation } from "../../../features/Activites/mutations.generated";
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

  const [createActivity, { loading }] = useInsertNewActivityMutation();
  const onSubmit = async (data: any) => {
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

    const image = await imageUpload(avatarFile);
    const video = await imageUpload(videoFile);

    await createActivity({
      onCompleted: () => {
        Toast?.show("Atividade criada com sucesso!", {
          position: Toast.positions.TOP,
        });
      },
      onError: () => {
        Toast?.show("Erro ao criar atividade", {
          position: Toast.positions.TOP,
        });
      },
      variables: {
        activity_name: data.name,
        activity_description: data.description,
        activity_shift: "MANHA",
        video_name: video.path,
        image_name: video.path,
        video_url: video.path,
        image_url: image.path,
      },
    });
    setValue("imageFile", null);
    setValue("videoFile", null);
    reset();
  };

  return (
    <View style={styles.container}>
      <ImageInput
        disabled={loading || isLoading}
        name="imageFile"
        control={control}
        onPick={(file) => {
          setValue("imageFile", file?.assets, {
            shouldValidate: false,
          });
        }}
      />
      <TextInput
        disabled={loading || isLoading}
        control={control}
        placeholder="Nome da atividade"
        name="name"
        errors={errors}
      />
      <TextAreaInput
        disabled={loading || isLoading}
        placeholder="Breve descrição da atividade"
        control={control}
        name="description"
        errors={errors}
      />
      <VideoInput
        disabled={loading || isLoading}
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
          isDisabled={loading || isLoading}
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
          isDisabled={loading || isLoading}
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
