import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    container: {
      alignItems: "center",
      marginTop: rw(spacing.lg),
    },
    pointsRow: {
      flexDirection: "row",
      alignItems: "flex-end",
    },
    points: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.display),
    },
    pointsSuffix: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.md),
      marginLeft: rw(spacing.xs),
      marginBottom: rw(6),
    },
    balanceLabel: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.sm),
      marginTop: rw(2),
    },
    track: {
      width: "100%",
      height: rw(6),
      borderRadius: rw(3),
      backgroundColor: colors.textgray,
      marginTop: rw(spacing.md),
      overflow: "hidden",
    },
    fill: {
      height: "100%",
      borderRadius: rw(3),
      backgroundColor: colors.viaWhite,
    },
    caption: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.sm),
      marginTop: rw(spacing.sm),
      textAlign: "center",
    },
  });
};
