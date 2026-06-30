import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background,
      borderRadius: 14,
      marginBottom: spacing.md,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 2,
    },
    pressed: {
      opacity: 0.9,
    },
    body: {
      padding: spacing.md,
    },
    chipRow: {
      marginBottom: spacing.sm,
    },
    title: {
      color: colors.text,
      fontSize: typography.size.md,
      fontWeight: typography.weight.bold,
      marginBottom: spacing.xs,
    },
    summary: {
      color: colors.textSecondary,
      fontSize: typography.size.sm,
      lineHeight: typography.size.sm * 1.5,
      marginBottom: spacing.sm,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    venue: {
      flexDirection: "row",
      alignItems: "center",
      flexShrink: 1,
      marginLeft: spacing.sm,
    },
    venueText: {
      color: colors.textSecondary,
      fontSize: typography.size.xs,
      marginLeft: 4,
      flexShrink: 1,
    },
  });
