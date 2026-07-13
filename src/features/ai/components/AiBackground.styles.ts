import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.viaWhite,
    },
  });
};
