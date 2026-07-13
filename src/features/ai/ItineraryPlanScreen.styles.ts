import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { spacing } = theme;

  return StyleSheet.create({
    screen: {
      flex: 1,
    },
    flex: {
      flex: 1,
    },
    content: {
      paddingHorizontal: rw(spacing.md),
      paddingBottom: rw(spacing.lg),
    },
    timeline: {
      marginTop: rw(spacing.lg),
    },
  });
};
