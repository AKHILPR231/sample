import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: rw(spacing.lg),
      paddingVertical: rw(spacing.sm),
    },
    circle: {
      width: rw(40),
      height: rw(40),
      borderRadius: rw(20),
      backgroundColor: colors.viaWhite,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.charcoal,
      shadowOpacity: 0.06,
      shadowRadius: rw(4),
      shadowOffset: { width: 0, height: rw(1) },
      elevation: 1,
    },
  });
};
