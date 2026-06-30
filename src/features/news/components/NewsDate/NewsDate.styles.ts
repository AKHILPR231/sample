import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      marginRight: spacing.xs + 2,
    },
    text: {
      color: colors.textSecondary,
      fontSize: typography.size.xs,
    },
  });
