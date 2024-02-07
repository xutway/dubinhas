import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ActivitySelectorItem from "components/Activites/ActivitySelectorItem";
import Drawer from "components/Activites/Drawer";
import StudentScheduleGrid from "components/Activites/ScheduleActivityGrid";
import Header from "components/home/Header";
import { router } from "expo-router";

import { activites } from "../mocked/studentes";

const StudentSchedule = () => {
  // TODO: replace this crap with a proper type
  type activityType = {
    id: number;
    name: string;
    description: string;
    img: string;
    video: string;
    key?: number;
  }[];

  const data: activityType = [...activites];
  const drawerData: activityType = [...activites];

  data.forEach(
    (
      activity: {
        id: number;
        name: string;
        description: string;
        img: string;
        video: string;
        key?: number;
      },
      index,
    ) => {
      activity.key = index;
    },
  );

  useEffect(() => {
    data.push({
      img: "",
      id: data.length + 1,
      video: "",
      name: "Adicionar Atividade",
      description: "Clique para adicionar uma atividade",
      key: data.length + 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState({ data });

  const [drawer, setDrawer] = useState(false);

  return (
    <View>
      <Header userID={1} />
      <View style={styles.separator} />
      <StudentScheduleGrid
        data={state.data}
        onDragRelease={(data) => setState({ data })}
        onCancel={() => router.back()}
        onConfirm={() => {}}
        title="Turno da Manhã"
        onAdd={() => setDrawer(!drawer)}
      />
      <Drawer
        onSearch={() => {}}
        searchBarLabel="Pesquisar  Atividade"
        isOpen={drawer}
        onOpen={function (): void {
          throw new Error("Function not implemented.");
        }}
        onClose={() => setDrawer(!drawer)}
        item={(info) => (
          <ActivitySelectorItem
            key={info.id}
            data={info}
            onPress={() => {
              console.log("selecionado", info?.id);
            }}
          />
        )}
        data={drawerData}
      />
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
