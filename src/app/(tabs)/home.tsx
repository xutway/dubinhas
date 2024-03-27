import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { LogOut } from "lucide-react-native";

import ActivitesList from "../../components/Activites/ActivitesList";
import Header from "../../components/home/Header";
import { auth } from "../../config/firebaseConfig";
import useSchedule from "../../features/Schedule/schedule";

import { Box, Button, ScrollView } from "@gluestack-ui/themed";

const { height: screenHeith } = Dimensions.get("window");
export default function TabOneScreen() {
  const { slug } = useLocalSearchParams();
  const isAuthed = !!auth.currentUser;
  const { getScheduleByStudent } = useSchedule();
  const [activites, setActivites] = useState({});

  const handleGetSchedule = async (id: string) => {
    const data = await getScheduleByStudent(id);
    setActivites({
      MANHA: data?.MANHA ? data.MANHA[0].activitiesList : [],
      TARDE: data?.TARDE ? data.TARDE[0].activitiesList : [],
      NOITE: data?.NOITE ? data.NOITE[0].activitiesList : [],
    });
  };

  useEffect(() => {
    if (slug?.toString() === "" || !slug) return;
    handleGetSchedule(slug?.toString());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <ImageBackground
      source={require("../../assets/images/BackgroundActivites.png")}
      style={{ width: "100%", height: "100%", backgroundPosition: "cover" }}
    >
      <ScrollView scrollEnabled style={styles.container}>
        <Header userID={slug?.toString() ?? ""} />
        <View style={styles.separator} />
        <ActivitesList
          shift="MANHA"
          id={slug?.toString()}
          isTeacher={isAuthed}
          title="Turno da Manhã"
          // @ts-ignore
          data={activites.MANHA}
        />
        <ActivitesList
          shift="TARDE"
          isTeacher={isAuthed}
          id={slug?.toString()}
          title="Turno da Tarde"
          // @ts-ignore
          data={activites.TARDE}
        />
        <ActivitesList
          shift="NOITE"
          isTeacher={isAuthed}
          id={slug?.toString()}
          title="Turno da Noite"
          // @ts-ignore
          data={activites?.NOITE}
        />
      </ScrollView>
      <Box style={styles.buttonContainer}>
        <Button onTouchEnd={() => router.back()} style={styles.button}>
          <LogOut color="#000" size={30} />
          <Text style={styles.buttonTextStyle}>SAIR</Text>
        </Button>
      </Box>
    </ImageBackground>
  );
}
const { width: scr } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: screenHeith,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  button: {
    width: scr / 1.4,
    height: 50,
    fontWeight: "500",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#000",
    backgroundColor: "#FF948D",
    position: "sticky",
    bottom: 30,
  },

  buttonTextStyle: {
    color: "#000",
    fontSize: 24,
  },
});
