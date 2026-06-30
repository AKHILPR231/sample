import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    container: {
      backgroundColor: colors.charcoal,
      paddingHorizontal: rw(spacing.lg),
      paddingBottom: rw(spacing.lg),
      borderBottomLeftRadius: rw(28),
      borderBottomRightRadius: rw(28),
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    backButton: {
      width: rw(40),
      height: rw(40),
      borderRadius: rw(20),
      backgroundColor: colors.viaWhite,
      alignItems: "center",
      justifyContent: "center",
    },
    identity: {
      alignItems: "center",
      marginTop: rw(spacing.sm),
    },
    name: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.xxl),
      letterSpacing: rw(2),
      marginTop: rw(spacing.md),
    },
    clubRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: rw(spacing.sm),
    },
    club: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendGigaMedium,
      fontSize: rf(typography.size.md),
      letterSpacing: rw(2),
      marginRight: rw(spacing.sm),
    },
  });
};
