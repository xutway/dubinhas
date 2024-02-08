import { FlatList, StyleSheet, Text, View } from "react-native";

import SearchInput from "components/SearchInput";
import ActivityAddButton from "components/Teacher/ActivityAddButton";
import ActivityCard from "components/Teacher/ActivityCard";
import { router } from "expo-router";

type ActivityListProps = {
  activities: any[];
};

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Atividades Cadastradas</Text>
      <View style={{ maxWidth: 250 }}>
        <SearchInput onChange={() => {}} placeholder="Pesquise Por atividade" />
      </View>
      <FlatList
        data={activities}
        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
        horizontal
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
