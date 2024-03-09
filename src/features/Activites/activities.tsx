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

const useActitivities = () => {
  const [loading, setLoading] = useState(false);
  const getActivities = async (name?: string) => {
    try {
      setLoading(true);
      const activitiesRef = query(
        collection(db, "activities"),
        name?.length > 0 ? where("name", "==", name) : null,
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
      console.error("Error getting document h:", error);
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
      console.error("Error getting document:", error);
    }
  };
  return { getActivities, loading, getOneActivity };
};

export default useActitivities;
