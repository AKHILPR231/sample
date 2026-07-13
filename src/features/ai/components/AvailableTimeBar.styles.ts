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
      backgroundColor: colors.viaWhite,
      borderRadius: rw(12),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(spacing.md),
      marginTop: rw(spacing.md),
    },
    available: {
      flex: 1,
      color: colors.viaNavy,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(0.5),
      marginRight: rw(spacing.md),
    },
    totalWrap: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconWrap: {
      width: rw(32),
      height: rw(32),
      borderRadius: rw(16),
      backgroundColor: colors.webBg1,
      alignItems: "center",
      justifyContent: "center",
      marginRight: rw(spacing.sm),
    },
    totalLabel: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
    },
    totalValue: {
      color: colors.onSurface,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
    },
  });
};
