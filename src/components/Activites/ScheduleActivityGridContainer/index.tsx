import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

import ActivitySelectorItem from "components/Activites/ActivitySelectorItem";
import Drawer from "components/Activites/Drawer";
import { router } from "expo-router";

import StudentScheduleGrid from "../ScheduleActivityGrid";

interface ScheduleActivityGridContainerProps {
  data?: any[];
  onDragRelease?: (data: any) => void;
  onConfirm?: (data: any) => void;
  title?: string;
  onAdd?: () => void;
  initialData?: any;
  activities: any;
  onSearch?: (value: string) => void;
}

const ScheduleActivityGridContainer: React.FC<
  ScheduleActivityGridContainerProps
> = ({ onConfirm, initialData, activities, onSearch }) => {
  const drawerData = [...activities];

  const activitiesArr = initialData;

  const activitiesToHandle = [];
  activitiesArr?.forEach((item: any, index) => {
    item.key = index + 1;
    activitiesToHandle.push({
      ...item,
    });
  });

  const [drawer, setDrawer] = useState(false);

  const data = [...activitiesToHandle] ?? [];

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
      imageFile: data.imageFile,
      id: data.id,
      videoFile: data.videoFile,
      name: data.name,
      description: data.description,
      key: newData.length + 1,
    });

    setState({ data: newData });
    setDrawer(!drawer);
  };
  const handleRemove = (id: string) => {
    const newData = state.data.filter((item) => item.id !== id);
    setState({ data: newData });
  };
  return (
    <SafeAreaView>
      <StudentScheduleGrid
        data={state.data}
        onRemove={handleRemove}
        onDragRelease={(data) => setState({ data })}
        onCancel={() => router.back()}
        onConfirm={onConfirm}
        title="Tabela de atividades"
        onAdd={() => setDrawer(!drawer)}
      />
      <Drawer
        onSearch={onSearch}
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
