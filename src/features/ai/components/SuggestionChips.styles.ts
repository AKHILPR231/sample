import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    wrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: rw(spacing.sm),
    },
    centered: {
      justifyContent: "center",
    },
    compact: {
      justifyContent: "flex-start",
      marginTop: rw(spacing.xs),
      marginBottom: rw(spacing.md),
    },
    chip: {
      borderWidth: 1,
      borderColor: colors.lightgrey,
      backgroundColor: colors.viaWhite,
      borderRadius: rw(22),
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(12),
    },
    label: {
      color: colors.viaNavy,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
    },
  });
};
