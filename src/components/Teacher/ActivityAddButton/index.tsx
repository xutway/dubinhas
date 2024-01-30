import React from "react";
import { Pressable, Text, View } from "react-native";

import { styles } from "./styles";

import { Box } from "@gluestack-ui/themed";

type ActivityAddButtonProps = {
  name: string;
  description: string;
  onPress?: () => void;
};

const ActivityAddButton: React.FC<ActivityAddButtonProps> = ({
  name,
  description,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.borders}>
        <Text style={styles.plus}>+</Text>
      </View>
      <Box style={styles.textBox}>
        <Text style={styles.textTitle}>{name}</Text>
        <Text style={styles.textSubtitle}>{description}</Text>
      </Box>
    </Pressable>
  );
};

export default ActivityAddButton;
