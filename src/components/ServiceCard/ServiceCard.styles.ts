import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  fullCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,

    flexDirection: "row",
    alignItems: "center",

    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  halfCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,

    width: "48.5%",
    padding: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  yellowCard: {
    backgroundColor: "#FFD700",
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: "#FFD700",
  },

  iconContainer: {
    width: 52,
    height: 52,

    borderRadius: 10,

    backgroundColor: "#FBF3E0",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  yellowIconContainer: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#121212",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },

  yellowText: {
    color: "#121212",
  },

  yellowSubtitle: {
    color: "#121212",
    opacity: 0.75,
  },

  marginTop: {
    marginTop: 12,
  },
});

export default styles;