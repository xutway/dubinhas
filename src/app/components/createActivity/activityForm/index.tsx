import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-root-toast";

import * as DocumentPicker from "expo-document-picker";

import { useInsertNewActivityMutation } from "../../../features/Activites/mutations.generated";
import TextAreaInput from "../../TextAreaInput";
import TextInput from "../../TextInput";

import { Button, Input, InputField } from "@gluestack-ui/themed";

export default function ActivityForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "aaaas",
      lastName: "aaa",
    },
  });

  const [createActivity] = useInsertNewActivityMutation();
  const onSubmit = async (dataTosubmit: any) => {
    console.log(
      "🚀 ~ file: index.tsx:27 ~ onSubmit ~ dataTosubmit:",
      dataTosubmit,
    );
    await createActivity({
      onCompleted: (data: any) => {
        console.log("🚀 ~ file: index.tsx:46 ~ onSubmit ~ data:", data);

        Toast?.show("Atividade criada com sucesso!", {});
      },
      onError: (error: any) => {
        console.log("🚀 ~ file: index.tsx:44 ~ onSubmit ~ error:", error);

        Toast?.show("Erro ao criar atividade", {});
      },
      variables: {
        activity_name: "activity_name",
        activity_description: "activity_description",
        activity_shift: "activity_shift",
        video_name: "video_name",
        image_name: "image_name",
        video_url: "video_url",
        image_url: "image_url",
      },
    });
  };
  const getFile = async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: "image/*" });
    console.log(file);
  };
  return (
    <View style={styles.container}>
      <Button style={styles?.button} onPress={() => getFile()}>
        <Text style={styles?.plus}>+</Text>
        <Text style={styles?.text}>Imagem Atividade</Text>
      </Button>
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
      <Input
        variant="outline"
        isReadOnly
        style={{
          borderColor: "#000000",
          borderRadius: 50,
        }}
      >
        <InputField
          style={{
            fontSize: 14,
            color: "#000",
            fontWeight: "200",
            width: "100%",
            backgroundColor: "#F6F5F5",
          }}
          placeholderTextColor="#000"
          placeholder="Video Demonstrativo (MP4. MOV. Etc)"
        />
      </Input>
      <View style={styles.formButtons}>
        <Button
          style={{
            backgroundColor: "#FF948D",
            borderColor: "#000",
            borderWidth: 1,
            borderRadius: 50,
            minWidth: 150,
          }}
        >
          <Text>Cancelar</Text>
        </Button>
        <Button
          style={{
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

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 20,
  },
  formButtons: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  plus: {
    color: "#D9D9D9",
    fontSize: 60,
    fontWeight: "bold",
  },
  text: {
    color: "#000",
    fontWeight: "200",
  },
  button: {
    backgroundColor: "transparent",
    borderStyle: "dotted",
    borderWidth: 8,
    borderColor: "#D9D9D9",
    height: 200,
    width: "100%",
    flexDirection: "column",
  },
});
