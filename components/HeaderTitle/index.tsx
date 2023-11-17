import { StyleSheet, Text } from "react-native";

import { HeaderTitleProps } from "./Types";

import { Box } from "@gluestack-ui/themed";

const HeaderTitle = ({ title, subtitle }: HeaderTitleProps) => {
  return (
    <Box style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Box>
  );
};
export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "#000",
    fontWeight: "600",
  },
  subtitle: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontStyle: "normal",
    letterSpacing: 0.72,
  },
});
