import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: rw(spacing.md),
    },
    dot: {
      height: rw(8),
      borderRadius: rw(4),
      marginHorizontal: rw(3),
      backgroundColor: colors.viaNavy,
    },
  });
};
