import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
    },
    backButton: {
      width: rw(40),
      height: rw(40),
      borderRadius: rw(20),
      backgroundColor: colors.viaWhite,
      borderWidth: 1,
      borderColor: colors.lightgrey,
      alignItems: "center",
      justifyContent: "center",
      marginRight: rw(spacing.md),
    },
    title: {
      color: colors.onSurface,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.lg),
      letterSpacing: rw(1),
      textTransform: "uppercase",
    },
  });
};
