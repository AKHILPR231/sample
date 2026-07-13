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
    info: {
      flex: 1,
    },
    title: {
      color: colors.onSurface,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(0.5),
    },
    subtitle: {
      color: colors.onSurfaceVariant,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
      marginTop: rw(1),
    },
    meta: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
      marginTop: rw(1),
    },
    add: {
      borderWidth: 1,
      borderColor: colors.viaNavy,
      borderRadius: rw(18),
      paddingHorizontal: rw(spacing.lg),
      paddingVertical: rw(spacing.sm),
      marginLeft: rw(spacing.md),
    },
    addLabel: {
      color: colors.viaNavy,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.xs),
      letterSpacing: rw(0.5),
      textTransform: "uppercase",
    },
  });
};
