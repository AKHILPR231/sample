import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    bar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.charcoal,
      borderRadius: rw(24),
      paddingHorizontal: rw(spacing.lg),
      paddingVertical: rw(spacing.md),
      marginTop: rw(spacing.lg),
    },
    club: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.md),
      letterSpacing: rw(1),
    },
    badge: {
      backgroundColor: colors.viaWhite,
      borderRadius: rw(14),
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(4),
    },
    badgeText: {
      color: colors.charcoal,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.xs),
      letterSpacing: rw(1),
    },
  });
};
