import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    hero: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.charcoal,
      paddingHorizontal: rw(spacing.lg),
      paddingTop: rw(spacing.md),
      paddingBottom: rw(spacing.xl),
      borderBottomLeftRadius: rw(28),
      borderBottomRightRadius: rw(28),
    },
    title: {
      flex: 1,
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.xxl),
      letterSpacing: rw(1),
      marginRight: rw(spacing.md),
    },
  });
};
