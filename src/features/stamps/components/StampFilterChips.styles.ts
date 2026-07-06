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
      gap: rw(spacing.sm),
      paddingHorizontal: rw(spacing.md),
    },
    filterButton: {
      width: rw(36),
      height: rw(36),
      alignItems: "center",
      justifyContent: "center",
    },
    chip: {
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(spacing.sm),
      borderRadius: rw(20),
      borderWidth: 1,
    },
    chipInactive: {
      backgroundColor: colors.viaWhite,
      borderColor: colors.lightgrey,
    },
    chipActive: {
      backgroundColor: colors.viaNavy,
      borderColor: colors.viaNavy,
    },
    label: {
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
    },
    labelInactive: {
      color: colors.onSurface,
    },
    labelActive: {
      color: colors.viaWhite,
    },
    end: {
      width: rw(spacing.md),
    },
  });
};
