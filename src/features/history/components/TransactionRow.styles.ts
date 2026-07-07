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
      paddingVertical: rw(spacing.md),
      borderBottomWidth: 1,
      borderBottomColor: colors.lightgrey,
    },
    iconWrap: {
      width: rw(44),
      height: rw(44),
      borderRadius: rw(22),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      alignItems: "center",
      justifyContent: "center",
      marginRight: rw(spacing.md),
    },
    info: {
      flex: 1,
    },
    title: {
      color: colors.onSurface,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.md),
    },
    subtitle: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.sm),
      marginTop: rw(2),
    },
    amount: {
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      marginLeft: rw(spacing.md),
    },
    credit: {
      color: colors.viaNavy,
    },
    debit: {
      color: colors.aubergine,
    },
  });
};
