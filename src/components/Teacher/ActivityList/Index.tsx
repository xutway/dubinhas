import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import SearchInput from "components/SearchInput";
import ActivityAddButton from "components/Teacher/ActivityAddButton";
import ActivityCard from "components/Teacher/ActivityCard";
import { router } from "expo-router";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { db } from "../../../config/firebaseConfig";

type ActivityListProps = {
  activities: any[];
  onSearch?: (value: string) => void;
};

const ActivityList: React.FC<ActivityListProps> = () => {
  const [searchWhere, setsearchWhere] = useState("");
  const [activitiesList, setActivitiesList] = useState<any[]>([]);
  const activitiesRef = query(
    collection(db, "activities"),
    searchWhere.length > 0 && where("name", "==", searchWhere),
    orderBy("name"),
  );

  useEffect(() => {
    const handleData = async () => {
      await getDocs(activitiesRef).then((querySnapshot) => {
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        console.log("🚀 ~ awaitgetDocs ~ data:", data);

        setActivitiesList(data);
      });
    };

    handleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWhere]);

  const handleSearchWithDebounce = (value: string) => {
    if (searchWhere !== value) {
      setTimeout(() => {
        setsearchWhere(value);
      }, 2000);
    } else {
      if (searchWhere !== "") {
        setTimeout(() => {
          setsearchWhere("");
        }, 2000);
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
      <FlatList
        data={activitiesList || []}
        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
        horizontal
        refreshing
        renderItem={(data) => {
          return <ActivityCard data={data.item} />;
        }}
        ListHeaderComponent={
          <ActivityAddButton
            onPress={() => router.push("/createActivity")}
            description="Cadastra nova atividade"
            name="Nova atividade"
          />
        }
      />
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
