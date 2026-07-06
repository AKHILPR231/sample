import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.charcoal,
      paddingHorizontal: rw(spacing.lg),
      paddingBottom: rw(spacing.md),
    },
    rounded: {
      borderBottomLeftRadius: rw(28),
      borderBottomRightRadius: rw(28),
    },
    back: {
      width: rw(40),
      height: rw(40),
      borderRadius: rw(20),
      backgroundColor: colors.viaWhite,
      alignItems: "center",
      justifyContent: "center",
      marginRight: rw(spacing.md),
    },
    title: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.lg),
      letterSpacing: rw(1),
    },
  });
};
