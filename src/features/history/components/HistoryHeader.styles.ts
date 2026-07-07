import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    header: {
      backgroundColor: colors.charcoal,
      paddingHorizontal: rw(spacing.lg),
      paddingBottom: rw(spacing.lg),
      borderBottomLeftRadius: rw(28),
      borderBottomRightRadius: rw(28),
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
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
    cardRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: rw(spacing.lg),
    },
    clubRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    club: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendGigaMedium,
      fontSize: rf(typography.size.md),
      letterSpacing: rw(1),
    },
    tierBadge: {
      borderWidth: 1,
      borderColor: colors.viaWhite,
      borderRadius: rw(12),
      paddingHorizontal: rw(spacing.sm),
      paddingVertical: rw(2),
      marginLeft: rw(spacing.sm),
    },
    tierText: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.xs),
      letterSpacing: rw(1),
    },
    balanceBox: {
      alignItems: "flex-end",
    },
    balanceRow: {
      flexDirection: "row",
      alignItems: "flex-end",
    },
    balance: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.xl),
    },
    balanceSuffix: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.xs),
      marginLeft: rw(spacing.xs),
      marginBottom: rw(3),
    },
    balanceLabel: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
      marginTop: rw(2),
    },
  });
};
