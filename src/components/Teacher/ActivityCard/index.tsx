import { ImageBackground, Text, View } from "react-native";

import { Link } from "expo-router";

import { styles } from "./styles";

import { Box } from "@gluestack-ui/themed";

type ActivityProps = {
  data: {
    id: number;
    name: string;
    img: string;
    description: string;
    date?: string;
  };
};

const ActivityCard = ({ data }: ActivityProps) => {
  return (
    <>
      <View>
        <Link
          href={{
            pathname: "/Activities/[slug]",
            params: { slug: data.id },
          }}
        >
          <ImageBackground
            source={{ uri: data.img || "" }}
            style={styles.container}
          >
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
