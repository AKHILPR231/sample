import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    step: {
      alignItems: "center",
      marginBottom: rw(spacing.xl),
    },
    number: {
      color: colors.onSurface,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.md),
    },
    title: {
      color: colors.onSurface,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      textAlign: "center",
      marginTop: rw(spacing.sm),
    },
    description: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
      textAlign: "center",
      marginTop: rw(spacing.xs),
    },
  });
};
