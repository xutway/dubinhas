import { StyleSheet } from "react-native";

import { CustomAvatarProps } from "./types";

import { Avatar, AvatarImage, Box } from "@gluestack-ui/themed";

const CustomAvatar = ({ img }: CustomAvatarProps) => {
  return (
    <Box sx={styles.box}>
      <Avatar
        style={{
          width: 150,
          height: 150,
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
    </Box>
  );
};

export default CustomAvatar;

const styles = StyleSheet.create({
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  card: {
    width: "100%",
    backgroundColor: "#C3EBFF",
    minHeight: 200,
  },
});
