import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    card: {
      height: rw(150),
      borderRadius: rw(12),
      overflow: "hidden",
      backgroundColor: colors.lightgrey,
    },
    image: {
      width: "100%",
      height: "100%",
    },
  });
};
