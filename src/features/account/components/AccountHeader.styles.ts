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
      paddingBottom: rw(spacing.xl),
      borderBottomLeftRadius: rw(28),
      borderBottomRightRadius: rw(28),
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    backButton: {
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
    identity: {
      alignItems: "center",
      marginTop: rw(spacing.md),
    },
    name: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.xxl),
      letterSpacing: rw(2),
      marginTop: rw(spacing.md),
    },
    editButton: {
      borderWidth: 1,
      borderColor: colors.viaWhite,
      borderRadius: rw(22),
      paddingHorizontal: rw(spacing.lg),
      paddingVertical: rw(spacing.sm),
      marginTop: rw(spacing.md),
    },
    editLabel: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(1),
    },
  });
};
