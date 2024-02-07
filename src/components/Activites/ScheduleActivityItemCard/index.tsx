import { ImageBackground, StyleSheet, Text } from "react-native";

import { View } from "components/Themed";
import { Link } from "expo-router";

import { Box } from "@gluestack-ui/themed";

type scheduleActivityItemCardProps = {
  img?: string;
  name?: string;
  description?: string;
  isAddButton?: boolean;
  index?: number;
};

const ScheduleActivityItemCard: React.FC<scheduleActivityItemCardProps> = ({
  img,
  name,
  index,
  description,
  isAddButton,
}) => {
  return (
    <Link
      href={{
        pathname: isAddButton ? "/studentSchedule" : "/Activities/[slug]",
        params: { slug: index },
      }}
    >
      {isAddButton ? (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Text style={styles?.plus}>+</Text>
          </View>
          <Box style={styles.textBox}>
            <Text style={styles.textTitle}>{name}</Text>
            <Text style={styles.textSubtitle}>{description}</Text>
          </Box>
        </View>
      ) : (
        <ImageBackground source={{ uri: img }} style={styles.container}>
          <Box style={styles.textBox}>
            <Text style={styles.textTitle}>{name}</Text>
            <Text style={styles.textSubtitle}>{name}</Text>
          </Box>
        </ImageBackground>
      )}
    </Link>
  );
};

export default ScheduleActivityItemCard;

export const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 6,
    position: "absolute",
    borderStyle: "dotted",
    borderColor: "#D9D9D9",
    display: "flex",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 41,
    height: 122,
    paddingBottom: 20,
  },
  plus: {
    color: "#D9D9D9",
    fontSize: 30,
    fontWeight: "bold",
  },
  container: {
    width: 122,
    height: 122,
    borderRadius: 41,
    marginHorizontal: 10,
    overflow: "hidden",
    display: "flex",
    justifyContent: "flex-end",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "transparent",
  },

  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textSubtitle: {
    fontSize: 8,
    fontWeight: "600",
  },
  textBox: {
    backgroundColor: "#DBDBDB",
    height: 50,
    width: 122,
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
});
