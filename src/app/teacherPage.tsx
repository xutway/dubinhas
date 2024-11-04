import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import DialogModal from "components/Dialog";
import ActivityList from "components/Teacher/ActivityList/Index";
import StudentList from "components/Teacher/StudentList";
import { useNavigation } from "expo-router";

import { HandleSignout } from "../helper/handleSignOut";
import { users } from "../mocked/studentes";

const TeacherPage = () => {
  const [dialog, setDialog] = useState(false);
  const navigation = useNavigation();
  const { signOutUser } = HandleSignout();
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type === "GO_BACK") {
        setDialog(true);
        e.preventDefault();
      }
    });
    return () => {
      navigation.removeListener("beforeRemove", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
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
      <View
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: 0,
        }}
      >
        <DialogModal
          isOpen={dialog}
          hideIcon
          bodyText="Tem certeza que deseja sair:"
          title="Aviso"
          onCancel={() => setDialog(false)}
          onConfirm={() => signOutUser()}
        />
      </View>
    </>
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
