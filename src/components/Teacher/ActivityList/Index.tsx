import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import SearchInput from "components/SearchInput";
import ActivityAddButton from "components/Teacher/ActivityAddButton";
import ActivityCard from "components/Teacher/ActivityCard";
import { router, useFocusEffect } from "expo-router";

import useActitivities from "../../../features/Activites/activities";

import { Spinner } from "@gluestack-ui/themed";

type ActivityListProps = {
  activities?: any[];
  onSearch?: (value: string) => void;
};

const ActivityList: React.FC<ActivityListProps> = () => {
  const { getActivities, loading } = useActitivities();
  const [searchWhere, setsearchWhere] = useState("");
  const [activitiesList, setActivitiesList] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      getActivities(searchWhere).then((data) => {
        if (isMounted) {
          setActivitiesList([...data]);
        }
      });

      return () => {
        isMounted = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchWhere]),
  );

  const handleSearchWithDebounce = (value: string) => {
    if (searchWhere !== value) {
      setTimeout(() => {
        setsearchWhere(value);
      }, 800);
    } else {
      if (searchWhere !== "") {
        setTimeout(() => {
          setsearchWhere("");
        }, 800);
      }
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Atividades Cadastradas</Text>
      <View style={{ maxWidth: 250 }}>
        <SearchInput
          onChange={(e) => {
            handleSearchWithDebounce(e);
          }}
          placeholder="Pesquise Por atividade"
        />
      </View>
      {loading && activitiesList?.length > 0 ? (
        <Spinner />
      ) : (
        <FlatList
          data={activitiesList || []}
          ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
          horizontal
          refreshing={loading}
          onRefresh={() => console.log("refreshing")}
          renderItem={(data) => {
            return <ActivityCard data={data?.item} />;
          }}
          ListHeaderComponent={
            <ActivityAddButton
              onPress={() => router.push("/createActivity")}
              description="Cadastra nova atividade"
              name="Nova atividade"
            />
          }
        />
      )}
    </View>
  );
};

export default ActivityList;

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10,
    gap: 10,
  },
  inputTitle: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 24,
  },
});
