import { useState } from "react";
import Toast from "react-native-root-toast";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

import { db } from "../../config/firebaseConfig";
import useFileUpload from "../../helper/imageUploadHandler";

const useStudent = () => {
  const baseURL = process.env.EXPO_PUBLIC_FIREBASE_BUCKET;
  const { imageUpload } = useFileUpload();

  const [loading, setLoading] = useState(false);
  const getStudent = async (name?: string) => {
    setLoading(true);
    const studentsRef = query(
      collection(db, "student"),
      name.length > 0 ? where("name", "==", name + "~") : null,
      orderBy("name"),
    );

    return getDocs(studentsRef).then((querySnapshot) => {
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setLoading(false);
      return data;
    });
  };

  const getOneStudent = async (id: string) => {
    setLoading(true);
    const docRef = doc(db, "student", id);
    const data = (await getDoc(docRef)).data();
    setLoading(false);

    return data;
  };
  const registerStudent = async (data, avatarPath) => {
    try {
      setLoading(true);
      const storage = getStorage();
      const studentStorage = ref(storage, "files/");
      const image = await imageUpload(studentStorage, avatarPath, "students");

      if (!image) {
        Toast?.show("Selecione uma imagem", {
          position: Toast.positions.TOP,
        });
        return;
      }

      const batch = writeBatch(db);

      const studentRef = doc(collection(db, "student"));
      batch.set(studentRef, {
        name: data.name,
        phone: data.phone,
        img: baseURL + "/" + image.fullPath,
      });

      const scheduleData = {
        activities: {
          activitiesList: [],
        },
        studentId: studentRef.id,
      };

      const scheduleRef = doc(collection(db, "schedule"));
      batch.set(scheduleRef, scheduleData);
      batch.update(studentRef, { scheduleID: scheduleRef.id });
      await batch.commit();

      Toast?.show("Aluno cadastrado com sucesso", {
        position: Toast.positions.TOP,
      });
      setLoading(true);
    } catch (err) {
      console.log("🚀 ~ registerStudent ~ err:", err);
      setLoading(false);
      Toast?.show("Erro ao cadastrar aluno", {
        position: Toast.positions.TOP,
      });
    }
  };

  const updateStudent = async (id, data, avatarPath) => {
    try {
      setLoading(true);
      const storage = getStorage();
      const studentStorage = ref(storage, "files/");
      const image = await imageUpload(studentStorage, avatarPath, "students");

      if (!image) {
        Toast?.show("Selecione uma imagem", {
          position: Toast.positions.TOP,
        });
        return;
      }

      const studentRef = doc(db, "student", id);
      const batch = writeBatch(db);

      batch.update(studentRef, {
        name: data.name,
        phone: data.phone,
        img: baseURL + "/" + image.fullPath,
      });

      await batch.commit();

      Toast?.show("Aluno atualizado com sucesso", {
        position: Toast.positions.TOP,
      });
    } catch (err) {
      Toast?.show("Erro ao atualizar aluno", {
        position: Toast.positions.TOP,
      });
    } finally {
      setLoading(false);
    }
  };
  return { getStudent, loading, getOneStudent, registerStudent, updateStudent };
};

export default useStudent;
