import { FlatList, Text, View } from "react-native";

import ActivityItemCard from "../ActivityCard";
import { styles } from "./styles";

import { Spinner } from "@gluestack-ui/themed";

type itemProps = {
  id: number;
  name: string;
  File: string;
  description: string;
  shift: string;
  date: string;
  imageFile: string;
};

const ActivitesList = ({
  data,
  title,
  isTeacher,
  shift,
  id,
  loading,
}: {
  data: any;
  title: string;
  shift: string;
  isTeacher: boolean;
  id: string | number;
  loading?: boolean;
}) => {
  return (
    <>
      <View>
        <Text style={styles.mainTitle}>{title}</Text>
        {!loading ? (
          <FlatList
            // @ts-ignore
            data={data}
            refreshing={!data?.length || data?.length === 1}
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
                    name="Nova atividade"
                    description="Adiciona nova atividade"
                    shift={shift}
                    isAddButton
                    index={id}
                  />
                )}
              </>
            )}
            renderItem={({
              item,
              index,
            }: {
              item: itemProps;
              index: number;
            }) => {
              return (
                <ActivityItemCard
                  key={index}
                  index={item.id}
                  img={item.imageFile}
                  name={item.name}
                />
              );
            }}
          />
        ) : (
          <Spinner height={122} />
        )}
      </View>
    </>
  );
};
export default ActivitesList;
