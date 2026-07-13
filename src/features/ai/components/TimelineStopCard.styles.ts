import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    card: {
      backgroundColor: colors.viaWhite,
      borderRadius: rw(12),
      borderWidth: 1,
      borderColor: colors.lightgrey,
      overflow: "hidden",
    },
    body: {
      flexDirection: "row",
      alignItems: "center",
      padding: rw(spacing.md),
    },
    logoWrap: {
      width: rw(44),
      height: rw(44),
      borderRadius: rw(10),
      backgroundColor: colors.viaNavy,
      alignItems: "center",
      justifyContent: "center",
      marginRight: rw(spacing.md),
      overflow: "hidden",
    },
    logo: {
      width: rw(44),
      height: rw(44),
    },
    info: {
      flex: 1,
    },
    title: {
      color: colors.onSurface,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.md),
    },
    done: {
      textDecorationLine: "line-through",
      color: colors.textgray,
    },
    subtitle: {
      color: colors.onSurfaceVariant,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.sm),
      marginTop: rw(1),
    },
    meta: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
      marginTop: rw(2),
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: colors.lightgrey,
    },
    action: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: rw(spacing.md),
    },
    divider: {
      width: 1,
      alignSelf: "stretch",
      backgroundColor: colors.lightgrey,
    },
    actionLabel: {
      color: colors.viaNavy,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.xs),
      letterSpacing: rw(0.5),
      textTransform: "uppercase",
    },
    actionActive: {
      color: colors.textgray,
    },
  });
};
