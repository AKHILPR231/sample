import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    card: {
      borderRadius: rw(16),
      overflow: "hidden",
      backgroundColor: colors.lightgrey,
      justifyContent: "flex-end",
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      width: "100%",
      height: "100%",
    },
    scrim: {
      ...StyleSheet.absoluteFillObject,
      top: "45%",
      backgroundColor: colors.charcoal,
      opacity: 0.32,
    },
    label: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.md),
      letterSpacing: rw(1),
      textTransform: "uppercase",
      paddingHorizontal: rw(spacing.md),
      paddingBottom: rw(spacing.md),
    },
  });
};
