import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginBottom: rw(spacing.md),
    },
    chips: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: rw(spacing.sm),
    },
    submitButton: {
      borderWidth: 1,
      borderColor: colors.viaNavy,
      borderRadius: rw(22),
      paddingHorizontal: rw(spacing.lg),
      paddingVertical: rw(10),
    },
    submitLabel: {
      color: colors.viaNavy,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(0.5),
    },
    actionButton: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.viaNavy,
      borderRadius: rw(22),
      paddingVertical: rw(13),
      alignItems: "center",
      justifyContent: "center",
    },
    actionMuted: {
      backgroundColor: colors.lightgrey,
      borderColor: colors.lightgrey,
    },
    actionLabel: {
      color: colors.viaNavy,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(0.5),
      textTransform: "uppercase",
    },
    actionLabelMuted: {
      color: colors.textgray,
    },
  });
};
