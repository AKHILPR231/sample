import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    card: {
      marginBottom: rw(spacing.lg),
    },
    imageWrap: {
      width: "100%",
      height: rw(150),
      borderRadius: rw(12),
      overflow: "hidden",
      backgroundColor: colors.lightgrey,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    imageFallback: {
      backgroundColor: colors.lightgrey,
    },
    ribbon: {
      position: "absolute",
      top: rw(spacing.sm),
      left: 0,
      backgroundColor: colors.aubergine,
      paddingHorizontal: rw(spacing.sm),
      paddingVertical: rw(2),
      borderTopRightRadius: rw(4),
      borderBottomRightRadius: rw(4),
    },
    ribbonText: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.xs),
      letterSpacing: rw(1),
    },
    bookmark: {
      position: "absolute",
      top: rw(spacing.sm),
      right: rw(spacing.sm),
    },
    tierBadge: {
      position: "absolute",
      left: rw(spacing.sm),
      bottom: rw(spacing.sm),
      backgroundColor: colors.charcoal,
      borderRadius: rw(6),
      paddingHorizontal: rw(spacing.sm),
      paddingVertical: rw(2),
    },
    tierText: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.xs),
      letterSpacing: rw(1),
    },
    title: {
      color: colors.onSurface,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(0.5),
      marginTop: rw(spacing.sm),
    },
    description: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
      marginTop: rw(spacing.xs),
    },
    priceOld: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
      textDecorationLine: "line-through",
      marginTop: rw(spacing.sm),
    },
    priceNow: {
      color: colors.aubergine,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      marginTop: rw(2),
    },
    validity: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
      marginTop: rw(spacing.sm),
    },
  });
};
