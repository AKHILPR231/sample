import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    slide: {
      borderRadius: rw(18),
      backgroundColor: colors.viaWhite,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: rw(230),
      backgroundColor: colors.lightgrey,
    },
    imageFallback: {
      backgroundColor: colors.lightgrey,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(spacing.md),
    },
    footerText: {
      flex: 1,
    },
    name: {
      color: colors.onSurface,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.xl),
      letterSpacing: rw(1),
    },
    location: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.sm),
      marginTop: rw(2),
    },
    arrow: {
      width: rw(44),
      height: rw(44),
      borderRadius: rw(22),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
