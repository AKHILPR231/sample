import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    row: {
      flexDirection: "row",
    },
    rail: {
      width: rw(20),
      alignItems: "center",
    },
    dot: {
      width: rw(12),
      height: rw(12),
      borderRadius: rw(6),
      borderWidth: rw(2),
      borderColor: colors.viaNavy,
      backgroundColor: colors.viaWhite,
      marginTop: rw(spacing.xs),
    },
    line: {
      flex: 1,
      width: 1,
      backgroundColor: colors.lightgrey,
      marginVertical: rw(spacing.xs),
    },
    content: {
      flex: 1,
      paddingLeft: rw(spacing.sm),
      paddingBottom: rw(spacing.md),
    },
    time: {
      color: colors.onSurfaceVariant,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.xs),
      marginBottom: rw(spacing.xs),
    },
  });
};
