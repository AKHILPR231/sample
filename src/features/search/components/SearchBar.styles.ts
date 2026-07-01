import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      height: rw(52),
      borderRadius: rw(28),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      backgroundColor: colors.viaWhite,
      paddingHorizontal: rw(spacing.md),
    },
    input: {
      flex: 1,
      marginLeft: rw(spacing.sm),
      paddingVertical: 0,
      color: colors.onSurface,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.md),
    },
  });
};
