import { useState } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

const useSchedule = () => {
  const [loading, setLoading] = useState(false);

  const createOneSchedule = async (data: any, studentId) => {
    try {
      setLoading(true);
      const newActivity = {
        studentId,
      };
      await addDoc(collection(db, "schedule"), newActivity);
      setLoading(false);
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  const insertActivity = async (
    data: any,
    studentId: string,
    shift: string,
  ) => {
    const studentRef = doc(db, "student", studentId);
    const student = await getDoc(studentRef);
    const scheduleId = student?.data()?.scheduleIds[0];
    const currentDate = new Date();

    const formatedDate = `${currentDate?.getDate()}-${currentDate?.getMonth()}-${currentDate.getFullYear()}`;
    if (!scheduleId) {
      const scheduleObj = {
        studentId: data.studentId,
        [shift]: data[shift],
        date: formatedDate,
      };
      const scheduleCreated = await addDoc(
        collection(db, "schedule"),
        scheduleObj,
      );
      await updateDoc(studentRef, {
        scheduleIds: [scheduleCreated.id],
      });
    }
    if (scheduleId) {
      const scheduleRef = doc(db, "schedule", scheduleId);
      let currentSchedule;
      try {
        currentSchedule = (await getDoc(scheduleRef)).data();
      } catch (error) {
        console.error("Error getting document:", error);
      }
      await deleteDoc(scheduleRef);
      const newScheduleObj = {
        ...currentSchedule,
        studentId: data.studentId,
        [shift]: [...data[shift]],

        date: formatedDate,
      };

      const newScheduleCreated = await addDoc(
        collection(db, "schedule"),
        newScheduleObj,
      );
      await updateDoc(studentRef, {
        scheduleIds: [newScheduleCreated.id],
      });
    }
  };
  const getOneSchedule = async (id: string, userID?: string) => {
    try {
      setLoading(true);
      let scheduleId;
      if (userID) {
        const user = await getDoc(doc(db, "student", userID));
        scheduleId = user.data().scheduleIds[0];
      } else {
        scheduleId = id;
      }

      const docRef = doc(db, "schedule", scheduleId);

      const data = (await getDoc(docRef))?.data();
      const activitiesArr = data[0];

      data.activities = activitiesArr;

      setLoading(false);

      return { ...data, id: scheduleId };
    } catch (error) {
      setLoading(false);
      console.error("Error getting documenta:", error);
    }
  };

  const fetchActivities = async (ids) => {
    const activitiesRef = collection(db, "activities");
    const activities = [];

    for (const id of ids) {
      const docRef = doc(activitiesRef, id);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        activities.push({ id, ...docSnapshot.data() });
      } else {
        console.log(`Documento com ID ${id} não encontrado.`);
      }
    }

    return activities;
  };

  const getScheduleByStudent = async (id: string) => {
    const currentDate = new Date();

    const formatedDate = `${currentDate?.getDate()}-${currentDate?.getMonth()}-${currentDate.getFullYear()}`;
    try {
      const q = query(
        collection(db, "schedule"),
        where("studentId", "==", id),
        where("date", "==", formatedDate),
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Schedule not found.");

        // Create a new schedule
        const newSchedule = {
          date: formatedDate,
          studentId: id,
        };

        const newScheduleRef = await addDoc(
          collection(db, "schedule"),
          newSchedule,
        );
        const newScheduleId = newScheduleRef.id;
        await updateDoc(doc(db, "student", id), {
          scheduleIds: [newScheduleId],
        });
        return {};
      }

      const data = querySnapshot.docs[0]?.data();
      const manhaIds = data?.MANHA || [];
      const tardeIds = data?.TARDE || [];
      const noiteIds = data?.NOITE || [];

      if (!manhaIds && !tardeIds && !noiteIds) {
        console.log("No matching documents.");
        return {};
      }
      const obj = {
        MANHA: manhaIds?.length > 0 ? await fetchActivities(manhaIds) : [],
        TARDE: tardeIds?.length > 0 ? await fetchActivities(tardeIds) : [],
        NOITE: noiteIds?.length > 0 ? await fetchActivities(noiteIds) : [],
      };
      return obj;
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };
  return {
    loading,
    getOneSchedule,
    getScheduleByStudent,
    createOneSchedule,
    insertActivity,
  };
};

export default useSchedule;
