import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, typography } = theme;

  return StyleSheet.create({
    badge: {
      borderWidth: 1,
      borderColor: colors.viaWhite,
      borderRadius: rw(14),
      paddingHorizontal: rw(theme.spacing.md),
      paddingVertical: rw(4),
    },
    text: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.xs),
      letterSpacing: rw(1),
    },
  });
};
