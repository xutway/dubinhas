import { ImageBackground, Text, View } from "react-native";

import { router } from "expo-router";
import { LogOut } from "lucide-react-native";

import { styles } from "./styles";
import { activitesListProps } from "./types";

import { Box, Button, FlatList } from "@gluestack-ui/themed";

type itemProps = {
  id: number;
  name: string;
  img: string;
  description: string;
  date: string;
};

const ActivitesList = ({ data, title }: activitesListProps) => {
  return (
    <>
      <View>
        <Text style={styles.mainTitle}>{title}</Text>
        <FlatList
          horizontal
          data={data}
          maxHeight={124}
          // @ts-ignore
          renderItem={({ item }: { item: itemProps }) => (
            <ImageBackground
              // backgroundImage={`url(${item.img})`}
              source={{ uri: item?.img }}
              style={styles.container}
            >
              <Box style={styles.textBox}>
                <Text style={styles.textTitle}>{item?.name}</Text>
                <Text style={styles.textSubtitle}>{item?.name}</Text>
              </Box>
            </ImageBackground>
          )}
        />
      </View>
      <Box style={styles.buttonContainer}>
        <Button onTouchEnd={() => router.back()} style={styles.button}>
          <LogOut color="#000" size={30} />
          <Text style={styles.buttonTextStyle}>SAIR</Text>
        </Button>
      </Box>
    </>
  );
};
export default ActivitesList;
