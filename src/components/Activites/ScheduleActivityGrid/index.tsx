import React, { useEffect } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import DraggableGrid from "react-native-draggable-grid";

import HeaderTitle from "components/HeaderTitle";

import useFileUpload from "../../../helper/imageUploadHandler";
import GridItem from "../GridItem";
import { styles } from "./styles";

import { Button } from "@gluestack-ui/themed";

interface StudentScheduleGridProps {
  title: string;
  data: any[];
  onDragRelease: (data: any[]) => void;
  onCancel: () => void;
  onConfirm: (id: string[]) => void;
  onAdd: (data: any) => void;
  onRemove: (id: string) => void;
}

const StudentScheduleGrid: React.FC<StudentScheduleGridProps> = ({
  title,
  data,
  onDragRelease,
  onCancel,
  onConfirm,
  onAdd,
  onRemove,
}) => {
  const { width } = useWindowDimensions();

  const { getStorage } = useFileUpload();

  const submitActivities = async (data: any[]) => {
    const ids = data
      ?.filter((item) => !!item.id && isNaN(item.id))
      .map((item) => {
        return item?.id;
      });
    onConfirm(ids);
  };

  const handleImage = async (id: string) => {
    const img = await getStorage(id);
    return img;
  };

  useEffect(() => {
    if (!data) return;
    data?.map(async (item) => {
      if (item?.imageFile?.length > 0) {
        const img = await handleImage(item.imageFile);
        item.img = img;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  // This needs to be a function to work with the DraggableGrid component, dont ask me why

  return (
    <View style={styles.container}>
      <HeaderTitle title={title} />
      <View style={styles.wrapper}>
        <DraggableGrid
          numColumns={2}
          renderItem={(data) => (
            <View key={data?.id}>
              <GridItem
                onRemove={onRemove}
                item={data}
                onAdd={onAdd}
                width={width}
              />
            </View>
          )}
          itemHeight={124}
          data={data}
          onDragRelease={onDragRelease}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={{
            backgroundColor: "#FF948D",
            borderColor: "#000",
            borderWidth: 1,
            borderRadius: 50,
            minWidth: 130,
            width: "auto",
          }}
          onPress={onCancel}
        >
          <Text>Cancelar</Text>
        </Button>
        <Button
          sx={{
            backgroundColor: "#9EE699",
            borderColor: "#000",
            borderWidth: 1,
            borderRadius: 50,
            width: "auto",
            minWidth: 130,
          }}
          onPress={() => submitActivities(data)}
        >
          <Text>Concluir</Text>
        </Button>
      </View>
    </View>
  );
};

export default StudentScheduleGrid;
