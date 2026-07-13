import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    chip: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: rw(22),
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(10),
    },
    default: {
      backgroundColor: colors.viaWhite,
      borderColor: colors.lightgrey,
    },
    selected: {
      backgroundColor: colors.viaNavy,
      borderColor: colors.viaNavy,
    },
    muted: {
      backgroundColor: colors.lightgrey,
      borderColor: colors.lightgrey,
    },
    label: {
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
    },
    defaultText: {
      color: colors.viaNavy,
    },
    selectedText: {
      color: colors.viaWhite,
    },
    mutedText: {
      color: colors.textgray,
    },
    removeIcon: {
      marginLeft: rw(spacing.xs),
    },
  });
};
