import { FlatList, StyleSheet, Text, View } from "react-native";

import AddButton from "components/AddButtonRound";
import AvatarComponent from "components/Avatar/Index";
import SearchInput from "components/SearchInput";
import { router } from "expo-router";

type StudentListProps = {
  users: any[]; // Substitua any pelo tipo correto de seus usuários
};

const StudentList: React.FC<StudentListProps> = ({ users }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Alunos</Text>
      <View style={{ maxWidth: 250 }}>
        <SearchInput onChange={() => {}} placeholder="Pesquise Por aluno" />
      </View>
      <FlatList
        data={users}
        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
        horizontal
        // @ts-ignore
        renderItem={(data, index) => {
          return <AvatarComponent item={data.item} index={index} size="2xl" />;
        }}
        ListHeaderComponent={
          <AddButton
            name="Novo aluno"
            onPress={() => router.push("/createStudent")}
          />
        }
      />
    </View>
  );
};

export default StudentList;

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
