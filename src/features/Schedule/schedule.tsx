import { useState } from "react";

import {
  addDoc,
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
  newDate.setHours(newDate.getHours() - 3);
  const formattedDate = newDate.toISOString().split("T")[0];
  return formattedDate;
};

const handleDate = (date: Date) => {
  const newDate = new Date(date).setHours(date.getHours() - 3);
  const formattedDate = new Date(newDate).toISOString().split("T")[0];
  return formattedDate;
};

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

  const getOneSchedule = async (id: string, userID?: string) => {
    try {
      setLoading(true);
      let scheduleId;
      if (userID) {
        const user = await getDoc(doc(db, "student", userID));
        scheduleId = user.data().scheduleID;
      } else {
        scheduleId = id;
      }

      const docRef = doc(db, "schedule", scheduleId);

      const data = (await getDoc(docRef))?.data();
      let activitiesArr;

      if (data.activities?.length > 0) {
        activitiesArr = data?.activities;
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
      }
      data.activities = activitiesArr;

      setLoading(false);

      return { ...data, id: scheduleId };
    } catch (error) {
      setLoading(false);
      console.error("Error getting documenta:", error);
    }
  };

  const getScheduleByStudent = async (id: string) => {
    try {
      const today = new Date();

      const q = query(collection(db, "schedule"), where("studentId", "==", id));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      const data = querySnapshot.docs.map((doc) => {
        let activitiesToday = [];
        const schedule = doc.data();

        if (doc.data()?.activities.length > 0) {
          activitiesToday = schedule?.activities?.filter(
            (activity) =>
              formatFirebaseDate(activity.day) === handleDate(today),
          );
        }

        return { ...schedule, activities: activitiesToday };
      });

      const activitiesArr = data[0]?.activities;

      for (const activity of activitiesArr) {
        const newActivityList = await Promise.all(
          activity.activitiesList.map(async (activityID: any) => {
            const activityRef = doc(db, "activities", activityID);
            const docSnapshot = await getDoc(activityRef);
            const activityData = { ...docSnapshot.data(), id: docSnapshot.id };

            return activityData;
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
  return { loading, getOneSchedule, getScheduleByStudent, createOneSchedule };
};

export default useSchedule;
