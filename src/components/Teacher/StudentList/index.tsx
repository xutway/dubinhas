import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import AddButton from "components/AddButtonRound";
import AvatarComponent from "components/Avatar/Index";
import SearchInput from "components/SearchInput";
import { router, useFocusEffect } from "expo-router";

import useStudent from "../../../features/student/student";

import { Spinner } from "@gluestack-ui/themed";

type StudentListProps = {
  users?: any[];
};

const StudentList: React.FC<StudentListProps> = () => {
  const { getStudent, loading } = useStudent();
  const [searchWhere, setsearchWhere] = useState("");
  const [studentList, setStudentList] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      getStudent(searchWhere).then((data) => {
        if (isMounted) {
          setStudentList([...data]);
        }
      });

      return () => {
        isMounted = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchWhere]),
  );
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Alunos</Text>
      <View>
        <SearchInput
          onChange={(text) => setsearchWhere(text)}
          placeholder="Pesquisar por atividade"
        />
      </View>
      {loading ? (
        <Spinner height={178} />
      ) : (
        <FlatList
          data={studentList}
          ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
          horizontal
          refreshing={loading}
          // @ts-ignore
          renderItem={(data, index) => {
            return (
              <AvatarComponent item={data.item} index={index} size="2xl" />
            );
          }}
          ListHeaderComponent={
            <AddButton
              name="Novo aluno"
              onPress={() => router.push("/createStudent")}
            />
          }
        />
      )}
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
