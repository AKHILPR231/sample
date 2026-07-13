import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    card: {
      backgroundColor: colors.viaWhite,
      borderRadius: rw(16),
      padding: rw(spacing.md),
      shadowColor: colors.charcoal,
      shadowOpacity: 0.06,
      shadowRadius: rw(8),
      shadowOffset: { width: 0, height: rw(2) },
      elevation: 2,
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      width: rw(40),
      height: rw(40),
      borderRadius: rw(20),
      backgroundColor: colors.viaNavy,
      alignItems: "center",
      justifyContent: "center",
      marginRight: rw(spacing.md),
    },
    title: {
      flex: 1,
      color: colors.viaNavy,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.xl),
      letterSpacing: rw(0.5),
    },
    share: {
      width: rw(36),
      height: rw(36),
      borderRadius: rw(18),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: rw(spacing.sm),
    },
    chips: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: rw(spacing.sm),
      marginTop: rw(spacing.md),
    },
    chip: {
      borderWidth: 1,
      borderColor: colors.lightgrey,
      borderRadius: rw(16),
      paddingHorizontal: rw(spacing.sm),
      paddingVertical: rw(spacing.xs),
    },
    chipLabel: {
      color: colors.onSurfaceVariant,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
    },
  });
};
