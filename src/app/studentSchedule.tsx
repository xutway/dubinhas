import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-root-toast";

import ScheduleActivityGridContainer from "components/Activites/ScheduleActivityGridContainer";
import Header from "components/home/Header";
import { router, useLocalSearchParams } from "expo-router";
import { DocumentData } from "firebase/firestore";

import useActitivities from "../features/Activities/activities";
import useSchedule from "../features/Schedule/schedule";

import { Spinner } from "@gluestack-ui/themed";

const StudentSchedule = () => {
  const { loading, insertActivity, getScheduleByStudent } = useSchedule();

  const { getActivities } = useActitivities();

  const { shift, userID } = useLocalSearchParams();
  // TODO: replace this crap with a proper type

  const [schedule, setSChedule] = useState<DocumentData>();
  const [activities, setActivites] = useState([]);
  const [searchWhere, setsearchWhere] = useState("");

  const handleGetOneActivity = async (id?: string) => {
    const data = await getScheduleByStudent(id);

    setSChedule(data);
  };

  const handleGetActivities = async (search: string) => {
    const data: DocumentData[] = await getActivities(search);
    setActivites(data);
  };

  const handleSubmit = async (data: any, studentID, shift: string) => {
    try {
      const currentDate = new Date();
      const formatedDate = `${currentDate?.getDate()}-${currentDate?.getMonth()}-${currentDate.getFullYear()}`;
      const newSchedule = {
        studentId: studentID,
        [shift]: data,
        date: formatedDate,
      };
      await insertActivity(newSchedule, studentID, shift);
      Toast?.show("Agenda salva com sucesso", {
        position: Toast.positions.TOP,
      });
      router.push("/teacherPage");
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
          onConfirm={(data) =>
            handleSubmit(data, userID?.toString(), shift?.toString())
          }
          initialData={schedule?.[shift?.toString()]}
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
