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
    scroll: {
      flex: 1,
    },
    content: {
      flexGrow: 1,
    },
    menu: {
      paddingHorizontal: rw(spacing.md),
      paddingTop: rw(spacing.lg),
    },
    centered: {
      flex: 1,
      backgroundColor: colors.webBg1,
      alignItems: "center",
      justifyContent: "center",
    },
    stateText: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.md),
    },
  });
};
