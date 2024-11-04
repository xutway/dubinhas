import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import useActitivities from "../../../features/Activities/activities";
import useFileUpload from "../../../helper/imageUploadHandler";
import ImageInput from "../../ImageInput";
import TextAreaInput from "../../TextAreaInput";
import TextInput from "../../TextInput";
import VideoInput from "../../VideoInput";
import styles from "./styles";

import { Button } from "@gluestack-ui/themed";

export default function ActivityForm() {
  const { activityID } = useLocalSearchParams();
  const { getStorage: getFileStorage } = useFileUpload();
  const { getOneActivity, updateActivity, createActivity } = useActitivities();
  const [activity, setActivity] = useState({} as any);

  const {
    control,
    handleSubmit,
    setValue,

    reset,
    formState: { errors, isSubmitting: isLoading },
  } = useForm({
    defaultValues: {
      description: activity?.description ?? "",
      name: activity?.name ?? "",
      imageFile: activity?.imageFile || ({} as any),
      videoFile: activity?.videoFile || ({} as any),
    },
    shouldUnregister: true,
  });
  const handleGetOneActivity = async (id: string) => {
    const data = await getOneActivity(id);
    const [imageFile, videoFile] = await Promise.all([
      (data.imageFile = getFileStorage(data.imageFile)),
      (data.imageFile = getFileStorage(data.videoFile)),
    ]);

    setActivity({ ...data, imageFile, videoFile });
    reset({
      description: data.description,
      name: data.name,
      imageFile,
      videoFile,
    });
  };
  useEffect(() => {
    if (activityID) {
      handleGetOneActivity(activityID?.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityID]);

  const onSubmit = async (data: any) => {
    if (activityID) {
      await updateActivity(
        activityID,
        data,
        data.imageFile,
        data.videoFile,
      ).then(() => {
        router.push("/teacherPage");
        reset();
      });
    } else {
      await createActivity(data, data.imageFile, data.videoFile).then(() => {
        router.push("/teacherPage");
        reset();
      });

      reset();
      router.push("/teacherPage");
    }
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
