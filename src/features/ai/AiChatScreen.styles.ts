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
    inputWrap: {
      width: "100%",
    },
    flex: {
      flex: 1,
    },
    chatContent: {
      paddingHorizontal: rw(spacing.md),
      paddingTop: rw(spacing.sm),
      paddingBottom: rw(spacing.md),
    },
  });
};
