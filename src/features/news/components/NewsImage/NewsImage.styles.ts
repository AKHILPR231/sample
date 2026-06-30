import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: colors.surface,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    placeholder: {
      alignItems: "center",
      justifyContent: "center",
    },
  });
