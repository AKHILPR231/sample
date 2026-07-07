import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.viaWhite,
      borderRadius: rw(14),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(spacing.lg),
      marginBottom: rw(spacing.md),
    },
    text: {
      flex: 1,
      color: colors.onSurface,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.md),
      marginRight: rw(spacing.md),
    },
  });
};
