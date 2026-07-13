import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginBottom: rw(spacing.md),
    },
    bubble: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.viaWhite,
      borderRadius: rw(18),
      borderTopLeftRadius: rw(4),
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(spacing.md),
    },
    text: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.sm),
      fontStyle: "italic",
    },
    dot: {
      color: colors.textgray,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.lg),
      marginLeft: rw(1),
    },
  });
};
