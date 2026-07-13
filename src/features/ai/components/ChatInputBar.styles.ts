import { Platform, StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    bar: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: rw(spacing.md),
      marginTop: rw(spacing.xs),
      marginBottom: rw(spacing.sm),
      backgroundColor: colors.viaWhite,
      borderRadius: rw(26),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      paddingHorizontal: rw(spacing.md),
      paddingVertical: Platform.OS === "ios" ? rw(14) : rw(spacing.sm),
      shadowColor: colors.charcoal,
      shadowOpacity: 0.05,
      shadowRadius: rw(8),
      shadowOffset: { width: 0, height: rw(2) },
      elevation: 1,
    },
    input: {
      flex: 1,
      paddingVertical: 0,
      color: colors.viaNavy,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.sm),
      marginRight: rw(spacing.sm),
    },
  });
};
