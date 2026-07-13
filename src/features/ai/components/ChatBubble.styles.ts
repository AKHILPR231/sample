import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    rowLeft: {
      flexDirection: "row",
      marginBottom: rw(spacing.sm),
    },
    rowRight: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginBottom: rw(spacing.sm),
    },
    aiBubble: {
      maxWidth: "85%",
      backgroundColor: colors.viaWhite,
      borderRadius: rw(18),
      borderTopLeftRadius: rw(4),
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(spacing.md),
      shadowColor: colors.charcoal,
      shadowOpacity: 0.04,
      shadowRadius: rw(6),
      shadowOffset: { width: 0, height: rw(2) },
      elevation: 1,
    },
    aiText: {
      color: colors.onSurfaceVariant,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.md),
      lineHeight: rf(typography.size.md) * 1.4,
    },
    userBubble: {
      maxWidth: "80%",
      backgroundColor: colors.viaNavy,
      borderRadius: rw(18),
      borderTopRightRadius: rw(4),
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(spacing.md),
    },
    userText: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.md),
    },
  });
};
