import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 10,
      padding: spacing.md,
      marginBottom: spacing.sm,
    },
    lastRow: {
      marginBottom: 0,
    },
    pressed: {
      opacity: 0.7,
    },
    body: {
      flex: 1,
    },
    title: {
      color: colors.text,
      fontSize: typography.size.sm,
      fontWeight: typography.weight.semibold,
      marginBottom: 2,
    },
    date: {
      color: colors.textSecondary,
      fontSize: typography.size.xs,
    },
  });
