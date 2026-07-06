import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: rw(spacing.md),
      borderBottomWidth: 1,
      borderBottomColor: colors.lightgrey,
    },
    info: {
      flex: 1,
    },
    name: {
      color: colors.onSurface,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.md),
    },
    status: {
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.sm),
      marginTop: rw(2),
    },
    completed: {
      color: colors.viaNavy,
    },
    pending: {
      color: colors.textgray,
    },
    amount: {
      color: colors.onSurface,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.md),
      marginLeft: rw(spacing.md),
    },
  });
};
