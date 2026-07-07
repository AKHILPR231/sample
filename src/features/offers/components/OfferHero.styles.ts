import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    hero: {
      width: "100%",
      height: rw(380),
      backgroundColor: colors.lightgrey,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    imageFallback: {
      backgroundColor: colors.lightgrey,
    },
    banner: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.aubergine,
      paddingHorizontal: rw(spacing.lg),
      paddingBottom: rw(spacing.sm),
    },
    bannerText: {
      flex: 1,
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.xxl),
      letterSpacing: rw(1),
    },
    tag: {
      backgroundColor: colors.viaWhite,
      borderRadius: rw(6),
      paddingHorizontal: rw(spacing.sm),
      paddingVertical: rw(2),
      marginLeft: rw(spacing.sm),
    },
    tagText: {
      color: colors.viaNavy,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.md),
      letterSpacing: rw(1),
    },
    back: {
      position: "absolute",
      left: rw(spacing.lg),
      width: rw(44),
      height: rw(44),
      borderRadius: rw(22),
      backgroundColor: colors.viaWhite,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
