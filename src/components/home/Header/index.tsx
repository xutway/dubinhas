import React, { useEffect } from "react";
import { Dimensions, Text } from "react-native";

import { router } from "expo-router";

import { auth } from "../../../config/firebaseConfig";
import useStudent from "../../../features/student/student";
import useFileUpload from "../../../helper/imageUploadHandler";
import { View } from "../../Themed";
import styles from "./styles";

import { Avatar, AvatarImage, Box } from "@gluestack-ui/themed";

const { width: screenWidth } = Dimensions.get("window");
const Header = ({ userID }: { userID: string }) => {
  const { getOneStudent } = useStudent();
  const { getStorage } = useFileUpload();

  const authed = auth?.currentUser;

  const [data, setData] = React.useState<any>({});

  const handleGetOneStudent = async (id: string) => {
    if (id === "" || !id) return;
    const data = await getOneStudent(id);
    const [img] = await Promise.all([getStorage(data.img)]);
    data.img = img;
    setData(data);
  };

  useEffect(() => {
    handleGetOneStudent(userID?.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);
  const { name, img, phone } = data;
  return (
    <View>
      <Box style={styles.card}>
        <Box sx={styles.box}>
          <Box style={styles.textBoxStart}>
            <Text style={styles.text}>{name}</Text>
          </Box>
          <Avatar
            onTouchEnd={() =>
              authed &&
              router.push({
                pathname: "/createStudent",
                params: { userID },
              })
            }
            style={{
              maxHeight: 150,
              maxWidth: 150,
              width: screenWidth / 3,
              height: screenWidth / 3,
              marginBottom: -40,
              borderColor: "#C3EBFF",
              marginLeft: "auto",
              marginRight: "auto",
              borderWidth: 10,
            }}
            bgColor="$amber600"
            size="lg"
            borderRadius="$full"
          >
            <AvatarImage
              source={{
                width: 200,
                height: 200,
                uri: img,
              }}
            />
          </Avatar>
          <Box style={styles.textBoxEnd}>
            <Text style={styles.text}>{phone}</Text>
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default Header;
