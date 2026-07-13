import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    screen: {
      flex: 1,
    },
    flex: {
      flex: 1,
    },
    content: {
      paddingHorizontal: rw(spacing.md),
      paddingBottom: rw(spacing.lg),
    },
    timeline: {
      marginTop: rw(spacing.lg),
    },
    recommended: {
      backgroundColor: colors.viaWhite,
      borderRadius: rw(12),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      paddingHorizontal: rw(spacing.md),
      paddingBottom: rw(spacing.xs),
      marginTop: rw(spacing.md),
    },
    recommendedBadge: {
      alignSelf: "flex-start",
      color: colors.viaWhite,
      backgroundColor: colors.viaNavy,
      overflow: "hidden",
      borderRadius: rw(10),
      paddingHorizontal: rw(spacing.sm),
      paddingVertical: rw(2),
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.xs),
      letterSpacing: rw(0.5),
      textTransform: "uppercase",
      marginTop: rw(spacing.md),
    },
  });
};
