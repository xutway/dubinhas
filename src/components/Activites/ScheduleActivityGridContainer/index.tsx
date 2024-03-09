import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

import ActivitySelectorItem from "components/Activites/ActivitySelectorItem";
import Drawer from "components/Activites/Drawer";
import { router } from "expo-router";

import StudentScheduleGrid from "../ScheduleActivityGrid";

interface ScheduleActivityGridContainerProps {
  data?: any[]; // replace any with the actual type of the data
  onDragRelease?: (data: any) => void; // replace any with the actual type of the data
  onCancel?: () => void;
  onConfirm?: (data: any) => void;
  title?: string;
  onAdd?: () => void;
  initialData?: any;
  activities: any;
}

const ScheduleActivityGridContainer: React.FC<
  ScheduleActivityGridContainerProps
> = ({ onConfirm, initialData, activities }) => {
  const drawerData = [...activities];

  const activitiesArr = initialData;

  const activitiesToHandle = [];
  activitiesArr?.forEach((activity) => {
    activity.activitiesList.forEach((activity: any, index) => {
      activity.key = index + 1;
      activitiesToHandle.push(activity);
    });
  });

  const [drawer, setDrawer] = useState(false);
  console.log("🚀 ~ activitiesToHandle:", activitiesToHandle);

  const data = [...activitiesToHandle] ?? [];
  console.log("🚀 ~ activitiesToHandle:", activitiesToHandle);

  const [state, setState] = useState({ data });

  useEffect(() => {
    if (!initialData) return;
    data.push({
      img: "",
      id: 0,
      video: "",
      name: "Adicionar Atividade",
      description: "Clique para adicionar uma atividade",
      key: 0,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const handleAdd = (data: any) => {
    const newData = [...state.data];
    newData?.push({
      imgageFile: data.imageFile,
      id: data.id,
      videoFile: data.videoFile,
      name: data.name,
      description: data.description,
      key: newData.length + 1,
    });

    setState({ data: newData });
    setDrawer(!drawer);
  };
  return (
    <SafeAreaView>
      <StudentScheduleGrid
        data={state.data}
        onDragRelease={(data) => setState({ data })}
        onCancel={() => router.back()}
        onConfirm={onConfirm}
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
              handleAdd(info);
            }}
          />
        )}
        data={drawerData}
      />
    </SafeAreaView>
  );
};
export default ScheduleActivityGridContainer;
