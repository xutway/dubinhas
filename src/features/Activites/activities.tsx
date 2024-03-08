import { useState } from "react";

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

const useActitivities = () => {
  const [loading, setLoading] = useState(false);
  const getActivities = async (name?: string) => {
    setLoading(true);
    const activitiesRef = query(
      collection(db, "activities"),
      name.length > 0 ? where("name", "==", name) : null,
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
  };
  return { getActivities, loading };
};

export default useActitivities;
