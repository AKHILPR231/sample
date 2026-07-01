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
      borderRadius: rw(16),
      padding: rw(spacing.md),
      marginBottom: rw(spacing.sm),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      shadowColor: colors.charcoal,
      shadowOpacity: 0.06,
      shadowRadius: rw(8),
      shadowOffset: { width: 0, height: rw(2) },
      elevation: 2,
    },
    thumb: {
      width: rw(56),
      height: rw(56),
      borderRadius: rw(10),
      backgroundColor: colors.lightgrey,
    },
    thumbFallback: {
      backgroundColor: colors.lightgrey,
    },
    info: {
      flex: 1,
      marginHorizontal: rw(spacing.md),
    },
    title: {
      color: colors.onSurface,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.md),
    },
    breadcrumb: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
      marginTop: rw(spacing.xs),
    },
    arrow: {
      width: rw(40),
      height: rw(40),
      borderRadius: rw(20),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
