import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-root-toast";

import ScheduleActivityGridContainer from "components/Activites/ScheduleActivityGridContainer";
import Header from "components/home/Header";
import { router, useLocalSearchParams } from "expo-router";
import { arrayUnion, doc, DocumentData, updateDoc } from "firebase/firestore";

import { db } from "../config/firebaseConfig";
import useActitivities from "../features/Activites/activities";
import useSchedule from "../features/Schedule/schedule";

import { Spinner } from "@gluestack-ui/themed";

const StudentSchedule = () => {
  const { getOneSchedule, loading } = useSchedule();
  const { getActivities, loading: loadingActivities } = useActitivities();
  const { shift } = useLocalSearchParams();
  // TODO: replace this crap with a proper type

  const [schedule, setSChedule] = useState<DocumentData>();
  const [activities, setActivites] = useState([]);

  const handleGetOneActivity = async (id: string) => {
    const data = await getOneSchedule(id);

    const activities = data.activities.filter(
      (activity) => activity.SHIFT === shift.toString(),
    );
    setSChedule(activities);
  };
  const handleGetActivities = async () => {
    const data: DocumentData[] = await getActivities();
    setActivites(data);
  };

  const handleSubmit = async (data: any, studentID) => {
    try {
      const currentDate = new Date();
      const newActivity = {
        activitiesList: data,
        day: currentDate,
        SHIFT: shift ?? "MANHA",
      };

      const scheduleRef = doc(db, "schedule", "rAD9wqNTheceNYav2XUw");
      await updateDoc(scheduleRef, {
        activities: arrayUnion(newActivity),
      });
      Toast?.show("Agenda salva com sucesso", {
        position: Toast.positions.TOP,
      });
      router.push("/home");
    } catch (error) {
      Toast?.show("Erro ao salvar Agenda", {
        position: Toast.positions.TOP,
      });
    }
  };

  const { userID } = useLocalSearchParams();

  useEffect(() => {
    if (userID === "" || !userID) return;
    handleGetActivities();

    handleGetOneActivity("1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);
  const hide = loading || loadingActivities || !schedule || !activities;
  return (
    <View>
      <Header userID={userID?.toString()} />
      <View style={styles.separator} />
      {hide ? (
        <Spinner />
      ) : (
        <ScheduleActivityGridContainer
          activities={activities}
          onConfirm={(data) => handleSubmit(data, userID)}
          initialData={schedule}
        />
      )}
    </View>
  );
};

export default StudentSchedule;

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
