import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.viaWhite,
      borderRadius: rw(14),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(spacing.lg),
      marginBottom: rw(spacing.md),
    },
    badge: {
      width: rw(32),
      height: rw(32),
      borderRadius: rw(16),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      alignItems: "center",
      justifyContent: "center",
      marginRight: rw(spacing.lg),
    },
    badgeText: {
      color: colors.onSurface,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
    },
    text: {
      flex: 1,
      color: colors.onSurface,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.md),
    },
  });
};
