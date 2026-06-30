import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.viaWhite,
      borderRadius: rw(20),
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(spacing.sm),
    },
    label: {
      color: colors.viaNavy,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(1),
      marginLeft: rw(spacing.xs),
    },
  });
};
