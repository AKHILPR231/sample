import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    footer: {
      flexDirection: "row",
      gap: rw(spacing.md),
      paddingHorizontal: rw(spacing.md),
      paddingTop: rw(spacing.md),
      backgroundColor: colors.viaWhite,
      borderTopWidth: 1,
      borderTopColor: colors.lightgrey,
    },
    button: {
      flex: 1,
      borderRadius: rw(26),
      paddingVertical: rw(spacing.md),
      alignItems: "center",
      justifyContent: "center",
    },
    secondary: {
      borderWidth: 1,
      borderColor: colors.viaNavy,
      backgroundColor: colors.viaWhite,
    },
    secondaryLabel: {
      color: colors.viaNavy,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(0.5),
      textTransform: "uppercase",
    },
    primary: {
      backgroundColor: colors.viaNavy,
    },
    primaryLabel: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(0.5),
      textTransform: "uppercase",
    },
  });
};
