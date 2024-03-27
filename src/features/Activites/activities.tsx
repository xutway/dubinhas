import { useState } from "react";
import Toast from "react-native-root-toast";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

import { db } from "../../config/firebaseConfig";
import useFileUpload from "../../helper/imageUploadHandler";

const useActitivities = () => {
  const { imageUpload } = useFileUpload();
  const baseURL = process.env.EXPO_PUBLIC_FIREBASE_BUCKET;
  const [loading, setLoading] = useState(false);
  const getActivities = async (name?: string) => {
    try {
      setLoading(true);
      const activitiesRef = query(
        collection(db, "activities"),
        name?.length > 0 ? where("name", "<=", name + "~") : null,
        orderBy("name"),
      );

      return getDocs(activitiesRef).then((querySnapshot) => {
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setLoading(false);
        return data;
      });
    } catch (error) {
      setLoading(false);
      console.error("Error getting document:");
    }
  };

  const getOneActivity = async (id: string) => {
    try {
      setLoading(true);
      const docRef = doc(db, "activities", id);
      const data = (await getDoc(docRef)).data();
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      console.error("Error getting document:");
    }
  };
  const createActivity = async (data, avatarFile, videoFile) => {
    setLoading(true);
    try {
      if (
        Object.keys(avatarFile).length === 0 ||
        Object.keys(videoFile).length === 0
      ) {
        throw new Error("Selecione um video e uma imagem");
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

      setLoading(false);
      Toast?.show("Atividade criada com sucesso!", {
        position: Toast.positions.TOP,
      });
    } catch (error) {
      Toast?.show("Erro ao criar atividade. Por favor, tente novamente.", {
        position: Toast.positions.TOP,
      });
      setLoading(false);
    }
  };

  const updateActivity = async (activityId, data, avatarFile, videoFile) => {
    setLoading(true);

    try {
      if (
        Object.keys(avatarFile).length === 0 ||
        Object.keys(videoFile).length === 0
      ) {
        throw new Error("Selecione um video e uma imagem");
      }

      const storage = getStorage();
      const activitiesStorage = ref(storage, "files/");

      const image = await imageUpload(
        activitiesStorage,
        avatarFile,
        "activities",
        `${data?.name}-image`,
      ).catch((error) => {
        console.error("Error getting document:", error);
      });
      const video = await imageUpload(
        activitiesStorage,
        videoFile,
        "activities",
        `${data?.name}-video`,
      );

      if (image && video) {
        const activityRef = doc(collection(db, "activities"), activityId);
        await updateDoc(activityRef, {
          description: data.description,
          name: data.name,
          videoFile: baseURL + "/" + video.fullPath,
          imageFile: baseURL + "/" + image.fullPath,
        });
      }

      setLoading(false);
      Toast?.show("Atividade atualizada com sucesso!", {
        position: Toast.positions.TOP,
      });
    } catch (error) {
      Toast?.show("Erro ao atualizar atividade. Por favor, tente novamente.", {
        position: Toast.positions.TOP,
      });
      setLoading(false);
    }
  };
  return {
    updateActivity,
    createActivity,
    getActivities,
    loading,
    getOneActivity,
  };
};

export default useActitivities;
