import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    avatar: {
      width: rw(28),
      height: rw(28),
      borderRadius: rw(14),
      alignItems: "center",
      justifyContent: "center",
      marginRight: rw(spacing.sm),
    },
    active: {
      backgroundColor: colors.viaNavy,
    },
    muted: {
      backgroundColor: colors.lightgrey,
    },
  });
};
