import { FlatList, Text, View } from "react-native";

import ActivityItemCard from "../ActivityCard";
import { styles } from "./styles";

type itemProps = {
  id: number;
  name: string;
  img: string;
  description: string;
  shift: string;
  date: string;
};

const ActivitesList = ({
  data,
  title,
  isTeacher,
  shift,
  id,
}: {
  data: itemProps;
  title: string;
  shift: string;
  isTeacher: boolean;
  id: string | number;
}) => {
  return (
    <>
      <View>
        <Text style={styles.mainTitle}>{title}</Text>
        <FlatList
          // @ts-ignore
          data={data}
          horizontal
          contentContainerStyle={{
            marginHorizontal: 10,
          }}
          ListHeaderComponentStyle={{
            marginRight: 20,
          }}
          ListHeaderComponent={() => (
            <>
              {isTeacher && (
                <ActivityItemCard
                  name="Nova atv"
                  description="Adiciona nova atv"
                  shift={shift}
                  isAddButton
                  index={id}
                />
              )}
            </>
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
