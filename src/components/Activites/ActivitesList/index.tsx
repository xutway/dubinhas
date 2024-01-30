import { FlatList, ImageBackground, Text, View } from "react-native";

import { Link } from "expo-router";

import { styles } from "./styles";

import { Box } from "@gluestack-ui/themed";

type itemProps = {
  id: number;
  name: string;
  img: string;
  description: string;
  date: string;
};

const ActivitesList = ({ data, title }: { data: itemProps; title: string }) => {
  return (
    <>
      <View>
        <Text style={styles.mainTitle}>{title}</Text>
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
    </>
  );
};
export default ActivitesList;
