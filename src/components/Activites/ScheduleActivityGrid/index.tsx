import React from "react";
import { ImageBackground, Text, useWindowDimensions, View } from "react-native";
import DraggableGrid from "react-native-draggable-grid";

import HeaderTitle from "components/HeaderTitle";

import { StyledCard, styles } from "./styles";

import { Box, Button, Pressable } from "@gluestack-ui/themed";

interface StudentScheduleGridProps {
  title: string;
  data: any[];
  onDragRelease: (data: any[]) => void;
  onCancel: () => void;
  onConfirm: () => void;
  onAdd: (data: any) => void;
}

const StudentScheduleGrid: React.FC<StudentScheduleGridProps> = ({
  title,
  data,
  onDragRelease,
  onCancel,
  onConfirm,
  onAdd,
}) => {
  const { width } = useWindowDimensions();
  // This needs to be a function to work with the DraggableGrid component, dont ask me why
  const item = (item) => {
    const hasMedia = item.img.length > 0;
    return (
      <Box
        sx={{
          width: width / 2.1,
          maxWidth: 400,
        }}
      >
        {!hasMedia ? (
          <Pressable onPress={onAdd} width="$full" style={StyledCard.container}>
            <Box width="$full" style={StyledCard.buttonContainer}>
              <Text style={StyledCard?.plus}>+</Text>
            </Box>
            <Box width="$full" style={StyledCard.textBox}>
              <Text style={StyledCard.textTitle}>{item.name}</Text>
              <Text style={StyledCard.textSubtitle}>{item.description}</Text>
            </Box>
          </Pressable>
        ) : (
          <ImageBackground
            source={{ uri: item.img }}
            style={StyledCard.container}
          >
            <Box style={StyledCard.textBox}>
              <Text style={StyledCard.textTitle}>{item.name}</Text>
              <Text style={StyledCard.textSubtitle}>{item.name}</Text>
            </Box>
          </ImageBackground>
        )}
      </Box>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderTitle title={title} />
      <View style={styles.wrapper}>
        <DraggableGrid
          numColumns={2}
          renderItem={(data) => <View key={data?.id}>{item(data)}</View>}
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
          onPress={onConfirm}
        >
          <Text>Concluir</Text>
        </Button>
      </View>
    </View>
  );
};

export default StudentScheduleGrid;
