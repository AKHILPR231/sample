import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.webBg1,
    },
    content: {
      paddingHorizontal: rw(spacing.md),
    },
    sectionHeader: {
      color: colors.textgray,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      marginTop: rw(spacing.md),
      marginBottom: rw(spacing.xs),
    },
  });
};
