import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: rw(spacing.lg),
      paddingTop: rw(spacing.xl),
    },
    hero: {
      width: rw(88),
      height: rw(88),
      borderRadius: rw(44),
      alignItems: "center",
      justifyContent: "center",
      marginBottom: rw(spacing.md),
    },
    subtitle: {
      color: colors.onSurfaceVariant,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.md),
      marginBottom: rw(spacing.xs),
    },
    title: {
      color: colors.viaNavy,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.xl),
      lineHeight: rf(typography.size.xl) * 1.35,
      textAlign: "center",
      marginBottom: rw(spacing.lg),
    },
    chips: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: rw(spacing.sm),
    },
    chip: {
      borderWidth: 1,
      borderColor: colors.lightgrey,
      backgroundColor: colors.viaWhite,
      borderRadius: rw(22),
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(12),
    },
    chipLabel: {
      color: colors.viaNavy,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
    },
  });
};
