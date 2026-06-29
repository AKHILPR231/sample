import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    bulletRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      paddingVertical: spacing.xs,
    },
    dot: {
      color: colors.primary,
      fontSize: typography.size.sm,
      lineHeight: typography.size.sm * 1.5,
      marginRight: spacing.sm,
    },
    label: {
      color: colors.textSecondary,
      fontSize: typography.size.sm,
      flexShrink: 1,
    },
    value: {
      color: colors.text,
      fontSize: typography.size.sm,
      fontWeight: typography.weight.semibold,
      textAlign: "right",
      marginLeft: spacing.md,
    },
    bulletText: {
      color: colors.textSecondary,
      fontSize: typography.size.sm,
      lineHeight: typography.size.sm * 1.5,
      flex: 1,
    },
  });
