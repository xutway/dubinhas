import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { Image } from "expo-image";

import useFileUpload from "../../../helper/imageUploadHandler";

import { Box } from "@gluestack-ui/themed";

type ActivitySelectorItemProps = {
  onPress: () => void;
  data: {
    imageFile: string;
    name: string;
    description: string;
  };
};
const ActivitySelectorItem: React.FC<ActivitySelectorItemProps> = ({
  data,
  onPress,
}: ActivitySelectorItemProps) => {
  const { imageFile, name, description } = data;
  const { getStorage } = useFileUpload();

  const [url, setUrl] = useState<string>();

  useEffect(() => {
    const fetchImage = async () => {
      const data = await getStorage(imageFile);
      setUrl(data);
    };
    fetchImage();
  });

  return (
    <Box
      sx={{
        width: "$full",
      }}
      style={styles.box}
    >
      <Pressable style={styles.container} onPress={onPress}>
        <Image style={styles.image} source={url || null} alt={name} />
        <Box style={styles.content}>
          <Text style={styles.title}>{name}</Text>
          <Text>{description}</Text>
        </Box>
      </Pressable>
    </Box>
  );
};

export default ActivitySelectorItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  box: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 105,
    borderColor: "white",
    borderWidth: 2,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    position: "absolute",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginLeft: 30,
    width: "100%",
    height: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subtitle: {
    fontSize: 14,
  },
});
