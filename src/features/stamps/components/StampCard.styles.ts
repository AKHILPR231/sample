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
      marginBottom: rw(spacing.md),
      borderWidth: 1,
      borderColor: colors.lightgrey,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconWrap: {
      width: rw(40),
      height: rw(40),
      borderRadius: rw(20),
      backgroundColor: colors.webBg1,
      alignItems: "center",
      justifyContent: "center",
      marginRight: rw(spacing.md),
    },
    headerText: {
      flex: 1,
    },
    title: {
      color: colors.onSurface,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(0.5),
    },
    subtitle: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
      marginTop: rw(2),
    },
    body: {
      marginTop: rw(spacing.lg),
      alignItems: "center",
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: rw(spacing.md),
    },
    stamp: {
      width: rw(56),
      height: rw(56),
      borderRadius: rw(28),
      alignItems: "center",
      justifyContent: "center",
    },
    stampFilled: {
      backgroundColor: colors.viaNavy,
    },
    stampEmpty: {
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.textgray,
    },
    stampNumber: {
      color: colors.textgray,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.md),
    },
    progress: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.sm),
      textAlign: "center",
      marginTop: rw(spacing.lg),
    },
    redeem: {
      backgroundColor: colors.viaNavy,
      borderRadius: rw(24),
      paddingHorizontal: rw(spacing.xl),
      paddingVertical: rw(spacing.md),
      marginTop: rw(spacing.md),
    },
    redeemLabel: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(1),
      textTransform: "uppercase",
    },
    valid: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
      textAlign: "center",
      marginTop: rw(spacing.md),
    },
  });
};
