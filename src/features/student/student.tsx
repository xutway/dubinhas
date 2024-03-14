import { useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

const useStudent = () => {
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
  return { getStudent, loading, getOneStudent };
};

export default useStudent;
