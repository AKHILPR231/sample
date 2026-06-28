import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  number: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },

  titleContainer: {
    alignSelf: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: "#FFD700",
    paddingBottom: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  titleWithoutUnderline: {
    paddingBottom: 0,
  },
});

export default styles;