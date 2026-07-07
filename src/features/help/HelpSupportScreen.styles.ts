import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.webBg1,
    },
    flex: {
      flex: 1,
    },
    content: {
      paddingHorizontal: rw(spacing.md),
      paddingTop: rw(spacing.sm),
    },
  });
};
