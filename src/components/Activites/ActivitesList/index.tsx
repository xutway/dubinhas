import { FlatList, Text, View } from "react-native";

import ActivityItemCard from "../ActivityCard";
import { styles } from "./styles";

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
          contentContainerStyle={{
            marginHorizontal: 10,
          }}
          ListHeaderComponentStyle={{
            marginRight: 20,
          }}
          ListHeaderComponent={() => (
            <ActivityItemCard
              name="Nova atv"
              description="Adiciona nova atv"
              isAddButton
            />
          )}
          renderItem={({ item, index }: { item: itemProps; index: number }) => {
            return (
              <ActivityItemCard index={index} img={item.img} name={item.name} />
            );
          }}
        />
      </View>
    </>
  );
};
export default ActivitesList;
