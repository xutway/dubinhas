import { ImageBackground, StyleSheet, View } from "react-native";

import ActivityList from "components/Teacher/ActivityList/Index";
import StudentList from "components/Teacher/StudentList";

import { users } from "../mocked/studentes";

const TeacherPage = () => {
  return (
    <View>
      <ImageBackground
        source={require("../assets/images/BackgroundForm.png")}
        style={{ width: "100%", height: "100%", backgroundPosition: "cover" }}
      >
        <View style={styles.separator} />
        <StudentList users={users} />
        <ActivityList />
        <View style={styles.inputContainer} />
      </ImageBackground>
    </View>
  );
};

export default TeacherPage;

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  inputContainer: {
    paddingHorizontal: 10,
    gap: 10,
  },
});
