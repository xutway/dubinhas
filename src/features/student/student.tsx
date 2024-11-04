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

import { db } from "../../config/firebaseConfig";

const useStudent = () => {
  const baseURL = process.env.EXPO_PUBLIC_FIREBASE_BUCKET;

  const [loading, setLoading] = useState(false);

  const deleteStudent = async (id) => {
    setLoading(true);
    const batch = writeBatch(db);
    const studentRef = doc(db, "student", id);
    batch.delete(studentRef);

    const scheduleRef = query(
      collection(db, "schedule"),
      where("studentId", "==", id),
    );
    const scheduleSnapshot = await getDocs(scheduleRef);

    scheduleSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    setLoading(false);
  };
  const getStudent = async (name?: string) => {
    setLoading(true);
    const studentsRef = query(
      collection(db, "student"),
      name?.length > 0 ? where("name", "==", name + "~") : null,
      orderBy("name"),
    );

    return await getDocs(studentsRef).then((querySnapshot) => {
      const data: any[] = [];
      querySnapshot?.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setLoading(false);
      return data;
    });
  };

  const getOneStudent = async (id: string) => {
    setLoading(true);

    const docRef = doc(db, "student", id);

    let docSnap;
    try {
      docSnap = await getDoc(docRef);
      if (!docSnap.exists) {
        // If document doesn't exist in cache, get from server
        docSnap = await getDoc(docRef);
      }
    } catch (error) {
      // If there's any error (including not finding the document in cache), get from server
      docSnap = await getDoc(docRef);
    }

    setLoading(false);
    return docSnap.data();
  };
  const registerStudent = async (data, avatarPath) => {
    try {
      setLoading(true);
      if (!avatarPath) {
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
        img: baseURL + "/" + avatarPath,
      });

      // const schedule = await addDoc(collection(db, "schedule"), {
      //   date: new Date(),
      //   studentId: studentRef.id,
      // });
      // batch.update(studentRef, { scheduleIds: [schedule.id] });
      await batch.commit();

      Toast?.show("Aluno cadastrado com sucesso", {
        position: Toast.positions.TOP,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Toast?.show("Erro ao cadastrar aluno", {
        position: Toast.positions.TOP,
      });
    }
  };

  const updateStudent = async (id, data, avatarPath) => {
    try {
      setLoading(true);

      if (!avatarPath) {
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
        img: baseURL + "/" + avatarPath,
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
  return {
    getStudent,
    loading,
    getOneStudent,
    registerStudent,
    updateStudent,
    deleteStudent,
  };
};

export default useStudent;
