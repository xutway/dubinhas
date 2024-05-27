import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-root-toast";

import { router, useLocalSearchParams } from "expo-router";
import { getStorage, ref } from "firebase/storage";

import useStudent from "../../features/student/student";
import useFileUpload from "../../helper/imageUploadHandler";
import AvatarInput from "../AvatarInput";
import { IconType } from "../Icon/icon";
import TextInput from "../TextInput";
import styles from "./styles";
import { studentFormDta, studentSchema } from "./types";

import { Button } from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";

export default function StudentForm() {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting: isLoading, disabled },
  } = useForm<studentFormDta>({
    defaultValues: {
      phone: "",
      name: "",
      avatarPath: null,
    },
    shouldUnregister: true,
    resolver: zodResolver(studentSchema),
  });
  const { userID } = useLocalSearchParams();
  const { imageUpload, getStorage: getFileStorage } = useFileUpload();
  const [currentStudent, setCurrentStudent] = useState(null);
  const { loading, registerStudent, getOneStudent, updateStudent } =
    useStudent();

  const disableSubmit = isLoading || loading;

  useEffect(() => {
    const fetchStudent = async () => {
      if (!userID) return;
      const data = await getOneStudent(userID?.toString());
      const img = await getFileStorage(data.img);
      setCurrentStudent({ ...data, img });
      reset({
        name: data.name,
        phone: data.phone,
        avatarPath: img,
      });
    };
    fetchStudent();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  const onSubmit = async (data: studentFormDta) => {
    try {
      const avatarFile = getValues("avatarPath");
      const storage = getStorage();
      const studentStorage = ref(storage, "files/");
      let image;
      if (!avatarFile || currentStudent?.img === "") {
        Toast?.show("Selecione uma imagem", {
          position: Toast.positions.TOP,
        });
        return;
      }
      if (avatarFile !== currentStudent?.img) {
        const res = await imageUpload(studentStorage, avatarFile, "students");
        // @ts-ignore
        image = res?._location.path;
      } else {
        image = currentStudent?.img;
      }
      if (!image) {
        Toast?.show("Selecione uma imagem", {
          position: Toast.positions.TOP,
        });
        return;
      }
      if (userID) {
        await updateStudent(userID, data, image);
      } else {
        await registerStudent(data, image);
      }
      reset();
      // router.push("/teacherPage");
    } catch (err) {
      Toast?.show("Erro ao cadastrar aluno", {
        position: Toast.positions.TOP,
      });
    }
  };

  return (
    <View style={styles.container}>
      <AvatarInput
        disabled={isLoading || loading}
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
        disabled={isLoading || loading}
        control={control}
        placeholder="Nome do aluno"
        name="name"
        maxLength={32}
        errors={errors}
      />
      <TextInput
        children={<IconType name="phone" size={15} color="#D9D9D9" />}
        disabled={isLoading || loading}
        control={control}
        placeholder="Telefone"
        name="phone"
        maxLength={15}
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
          isDisabled={disableSubmit || disabled}
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
