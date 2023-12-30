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
    formState: { errors, isSubmitting: isLoading },
  } = useForm({
    defaultValues: {
      description: "",
      name: "",
      imageFile: {} as any,
      videoFile: {} as any,
    },
  });

  const { imageUpload } = useFileUpload();

  const [createActivity, { loading }] = useInsertNewActivityMutation();

  const onSubmit = async (data: any) => {
    const avatarFile = getValues("imageFile");
    const videoFile = getValues("videoFile");

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
  };

  return (
    <View style={styles.container}>
      <ImageInput
        onPick={(file) => {
          setValue("imageFile", file?.assets, {
            shouldValidate: false,
          });
        }}
      />
      <TextInput
        control={control}
        placeholder="Nome da atividade"
        name="name"
        errors={errors}
      />
      <TextAreaInput
        placeholder="Breve descrição da atividade"
        control={control}
        name="description"
        errors={errors}
      />
      <VideoInput
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
          onPress={() => router.push("/(auth)")}
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
