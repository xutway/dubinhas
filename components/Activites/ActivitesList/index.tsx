import { FlatList, ImageBackground, Text, View } from "react-native";

import { Link, router } from "expo-router";
import { LogOut } from "lucide-react-native";

import { styles } from "./styles";

import { Box, Button } from "@gluestack-ui/themed";

type itemProps = {
  id: number;
  name: string;
  img: string;
  description: string;
  date: string;
  turno: string;
};

const ActivitesList = ({ data }: { data: itemProps }) => {
  return (
    <>
      <View>
        <FlatList
          // @ts-ignore
          data={data}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          horizontal
          renderItem={({ item, index }: { item: itemProps; index: number }) => {
            return (
              <Link
              href={{
                pathname: "/Activities/[slug]",
                params: { slug: index },
              }}
              >
              <Text>{item?.turno}</Text>
                <ImageBackground
                  source={{ uri: item?.img }}
                  style={styles.container}
                >
                  <Box style={styles.textBox}>
                    <Text style={styles.textTitle}>{item?.name}</Text>
                    <Text style={styles.textSubtitle}>{item?.name}</Text>
                  </Box>
                </ImageBackground>
              </Link>
            );
          }}
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
