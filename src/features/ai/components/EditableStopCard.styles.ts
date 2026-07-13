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
      borderRadius: rw(12),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      paddingHorizontal: rw(spacing.sm),
      paddingVertical: rw(spacing.md),
    },
    handle: {
      paddingHorizontal: rw(spacing.xs),
    },
    logoWrap: {
      width: rw(36),
      height: rw(36),
      borderRadius: rw(8),
      backgroundColor: colors.viaNavy,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: rw(spacing.sm),
      overflow: "hidden",
    },
    logo: {
      width: rw(36),
      height: rw(36),
    },
    info: {
      flex: 1,
    },
    title: {
      color: colors.onSurface,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
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
    remove: {
      width: rw(32),
      height: rw(32),
      borderRadius: rw(16),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: rw(spacing.sm),
    },
  });
};
