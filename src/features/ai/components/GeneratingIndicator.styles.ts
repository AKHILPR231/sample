import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: rw(spacing.xl),
    },
    badge: {
      width: rw(84),
      height: rw(84),
      borderRadius: rw(42),
      backgroundColor: colors.viaWhite,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.charcoal,
      shadowOpacity: 0.08,
      shadowRadius: rw(12),
      shadowOffset: { width: 0, height: rw(4) },
      elevation: 3,
    },
    caption: {
      color: colors.viaNavy,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.lg),
      textAlign: "center",
      marginTop: rw(spacing.lg),
    },
  });
};
