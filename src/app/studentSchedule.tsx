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

  const { getActivities } = useActitivities();

  const { shift, userID } = useLocalSearchParams();
  // TODO: replace this crap with a proper type

  const [schedule, setSChedule] = useState<DocumentData>();
  const [activities, setActivites] = useState([]);
  const [searchWhere, setsearchWhere] = useState("");

  const handleGetOneActivity = async (id?: string) => {
    const data = await getOneSchedule(id, userID?.toString());

    const activities =
      data?.activities?.filter(
        (activity) =>
          activity.SHIFT === shift.toString() &&
          activity?.day?.toDate()?.toDateString() === new Date().toDateString(),
      ) || [];

    setSChedule(activities);
  };

  const handleGetActivities = async (search: string) => {
    const data: DocumentData[] = await getActivities(search);
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

      const schedule = await getOneSchedule("", studentID);
      const scheduleRef = doc(db, "schedule", schedule.id);

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

  const handleSearchWithDebounce = (value: string) => {
    if (searchWhere !== value) {
      setTimeout(() => {
        setsearchWhere(value);
      }, 800);
    } else {
      if (searchWhere !== "") {
        setTimeout(() => {
          setsearchWhere("");
        }, 800);
      }
    }
  };

  useEffect(() => {
    if (userID === "" || !userID) return;
    handleGetOneActivity(userID?.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  // This useEffect will run when searchWhere changes
  useEffect(() => {
    handleGetActivities(searchWhere);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWhere]);

  const hide = loading || !schedule || !activities;

  return (
    <View>
      <Header userID={userID?.toString()} />
      <View style={styles.separator} />
      {hide ? (
        <Spinner />
      ) : (
        <ScheduleActivityGridContainer
          activities={activities}
          onConfirm={(data) => handleSubmit(data, userID?.toString())}
          initialData={schedule}
          onSearch={(e) => handleSearchWithDebounce(e)}
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
