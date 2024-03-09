import { useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

const formatFirebaseDate = (date: any) => {
  const newDate = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
  const formattedDate = newDate.toISOString().split("T")[0];
  return formattedDate;
};

const handleDate = (date: Date) => {
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
};

const useSchedule = () => {
  const [loading, setLoading] = useState(false);

  const getOneSchedule = async (id: string) => {
    try {
      setLoading(true);
      const docRef = doc(db, "schedule", "rAD9wqNTheceNYav2XUw");

      const data = (await getDoc(docRef))?.data();
      const activitiesArr = data?.activities;
      for (const activity of activitiesArr) {
        const newActivityList = await Promise.all(
          activity.activitiesList.map(async (activityID: any) => {
            const activityRef = doc(db, "activities", activityID);
            const docSnapshot = await getDoc(activityRef);
            return docSnapshot.data();
          }),
        );
        activity.activitiesList = newActivityList;
      }
      data.activities = activitiesArr;

      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      console.error("Error getting document:", error);
    }
  };
  const getScheduleByStudent = async (id: string) => {
    try {
      const today = new Date();

      const q = query(collection(db, "schedule"), where("studentID", "==", id));

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => {
        const schedule = doc.data();
        const activitiesToday = schedule.activities.filter(
          (activity) => formatFirebaseDate(activity.day) === handleDate(today),
        );
        return { ...schedule, activities: activitiesToday };
      });

      const activitiesArr = data[0]?.activities;

      for (const activity of activitiesArr) {
        const newActivityList = await Promise.all(
          activity.activitiesList.map(async (activityID: any) => {
            const activityRef = doc(db, "activities", activityID);
            const docSnapshot = await getDoc(activityRef);
            return docSnapshot.data();
          }),
        );
        activity.activitiesList = newActivityList;
      }
      const groupedActivities = activitiesArr.reduce((acc, activity) => {
        const shift = activity.SHIFT;
        if (!acc[shift]) {
          acc[shift] = [];
        }
        acc[shift].push(activity);
        return acc;
      }, {});
      return groupedActivities;
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };
  return { loading, getOneSchedule, getScheduleByStudent };
};

export default useSchedule;
