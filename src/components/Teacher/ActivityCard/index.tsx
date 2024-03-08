import { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";

import { Link } from "expo-router";

import useFileUpload from "../../../helper/imageUploadHandler";
import { styles } from "./styles";

import { Box } from "@gluestack-ui/themed";

type ActivityProps = {
  data: {
    id: number;
    name: string;
    imageFile: string;
    description: string;
    date?: string;
  };
};

const ActivityCard = ({ data }: ActivityProps) => {
  const [url, setUrl] = useState<string>("");

  const { getStorage } = useFileUpload();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const img = await getStorage(data.imageFile);
        setUrl(img);
      } catch (err) {
        console.log(err);
      }
    };

    fetchImage();
  }, [data.imageFile, getStorage]);

  return (
    <>
      <View>
        <Link
          href={{
            pathname: "/Activities/[slug]",
            params: { slug: data.id },
          }}
        >
          <ImageBackground source={{ uri: url || "" }} style={styles.container}>
            <Box style={styles.textBox}>
              <Text style={styles.textTitle}>{data.name}</Text>
              <Text style={styles.textSubtitle}>{data.description}</Text>
            </Box>
          </ImageBackground>
        </Link>
      </View>
    </>
  );
};
export default ActivityCard;
