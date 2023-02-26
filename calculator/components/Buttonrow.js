import { StyleSheet, View } from "react-native";

const ButtonRow = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default ButtonRow;