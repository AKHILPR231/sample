import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (_theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    inputWrap: {
      width: "100%",
    },
  });
