import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.viaWhite,
      borderRadius: rw(14),
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(spacing.md),
      marginBottom: rw(spacing.sm),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      shadowColor: colors.charcoal,
      shadowOpacity: 0.06,
      shadowRadius: rw(8),
      shadowOffset: { width: 0, height: rw(2) },
      elevation: 2,
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
    label: {
      flex: 1,
      color: colors.onSurface,
      fontFamily: typography.fonts.lexendGigaMedium,
      fontSize: rf(typography.size.md),
      letterSpacing: rw(1),
    },
  });
};
