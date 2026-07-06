import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    card: {
      backgroundColor: colors.viaWhite,
      borderRadius: rw(16),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      padding: rw(spacing.lg),
      marginTop: rw(spacing.md),
    },
    header: {
      color: colors.onSurface,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(0.5),
      textTransform: "uppercase",
      textAlign: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: rw(spacing.lg),
    },
    option: {
      alignItems: "center",
    },
    iconWrap: {
      width: rw(48),
      height: rw(48),
      borderRadius: rw(24),
      backgroundColor: colors.webBg1,
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
      marginTop: rw(spacing.xs),
    },
  });
};
