import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    card: {
      marginTop: rw(spacing.xl),
    },
    clubRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    club: {
      color: colors.onSurface,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.lg),
      letterSpacing: rw(1),
    },
    tier: {
      color: colors.textgray,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.xs),
      letterSpacing: rw(1),
      marginLeft: rw(spacing.sm),
    },
    clubSpacer: {
      flex: 1,
    },
    balanceRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginTop: rw(spacing.lg),
    },
    balanceText: {
      flex: 1,
    },
    balanceLabel: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.sm),
    },
    balanceValueRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginTop: rw(2),
    },
    balance: {
      color: colors.onSurface,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.display),
    },
    balanceSuffix: {
      color: colors.onSurface,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.md),
      marginLeft: rw(spacing.xs),
      marginBottom: rw(6),
    },
    qr: {
      flexDirection: "row",
      alignItems: "center",
    },
    qrLabel: {
      color: colors.onSurface,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(1),
      marginLeft: rw(spacing.xs),
    },
    spend: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.sm),
      marginTop: rw(spacing.sm),
    },
    buttons: {
      flexDirection: "row",
      marginTop: rw(spacing.lg),
      gap: rw(spacing.md),
    },
    button: {
      flex: 1,
      borderRadius: rw(24),
      paddingVertical: rw(spacing.md),
      alignItems: "center",
      justifyContent: "center",
    },
    buttonPrimary: {
      backgroundColor: colors.charcoal,
    },
    buttonPrimaryLabel: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(0.5),
    },
    buttonSecondary: {
      borderWidth: 1,
      borderColor: colors.onSurface,
    },
    buttonSecondaryLabel: {
      color: colors.onSurface,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(0.5),
    },
  });
};
