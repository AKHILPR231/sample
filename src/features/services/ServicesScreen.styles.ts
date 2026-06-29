import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    listContent: {
      padding: spacing.md,
      paddingBottom: spacing.xl,
    },
    column: {
      gap: spacing.md,
      marginBottom: spacing.md,
    },
    gridIntro: {
      color: colors.textSecondary,
      fontSize: typography.size.sm,
      marginBottom: spacing.md,
    },
    footer: {
      marginTop: spacing.xs,
    },
    centered: {
      flex: 1,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.lg,
    },
    stateTitle: {
      color: colors.text,
      fontSize: typography.size.md,
      fontWeight: typography.weight.semibold,
      textAlign: "center",
      marginTop: spacing.sm,
    },
    stateBody: {
      color: colors.textSecondary,
      fontSize: typography.size.sm,
      textAlign: "center",
      marginTop: spacing.xs,
      lineHeight: typography.size.sm * 1.5,
    },
  });
