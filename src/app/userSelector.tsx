import React, { useEffect } from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import StudentSelectorAvatar from "components/Auth/StudentSelector/StudentSelector";
import HeaderTitle from "components/HeaderTitle";

import useStudent from "../features/student/student";

import { Box, Spinner } from "@gluestack-ui/themed";

const { width: screenWidth, height: screenHeith } = Dimensions.get("window");
export default function TabOneScreen() {
  const { getStudent, loading } = useStudent();
  const [students, setStudents] = React.useState([]);
  useEffect(() => {
    Dimensions.addEventListener("change", () => {});
    const handleStudents = async () => {
      const data = await getStudent();
      setStudents(data);
    };
    handleStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const noData = !students?.length;
  return (
    <ImageBackground
      source={require("assets/images/Background2.png")}
      style={{ width: "100%", height: "100%", backgroundPosition: "cover" }}
    >
      <View style={styles.container}>
        <View style={styles.separator} />
        <HeaderTitle
          subtitle="Para entrar, arraste para o lado as bolhas até encontrar seu nome e rosto!"
          title="Olá Coleguinha!"
        />
        <Box style={styles.viewTop}>
          {loading || noData ? (
            <Spinner />
          ) : (
            <Carousel
              loop
              width={screenWidth}
              height={screenHeith / 1.5}
              scrollAnimationDuration={1000}
              data={students}
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
              mode="parallax"
              windowSize={40}
              modeConfig={{}}
              renderItem={({ item, index }) => (
                <View
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <StudentSelectorAvatar item={item} index={index} />
                </View>
              )}
            />
          )}
        </Box>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: screenHeith,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    width: "80%",
    marginTop: 30,
    marginBottom: 100,
  },
  viewTop: {
    marginTop: "auto",
    marginBottom: "auto",
    maxHeight: screenHeith / 2,
  },
});
