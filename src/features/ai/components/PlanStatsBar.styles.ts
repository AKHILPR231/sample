import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    bar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.viaNavy,
      borderRadius: rw(14),
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(spacing.md),
      marginTop: rw(spacing.md),
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconWrap: {
      width: rw(30),
      height: rw(30),
      borderRadius: rw(8),
      alignItems: "center",
      justifyContent: "center",
      marginRight: rw(spacing.sm),
    },
    label: {
      color: colors.lightgrey,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
    },
    value: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.md),
    },
  });
};
