import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    content: {
      padding: spacing.md,
      paddingBottom: spacing.xxl,
    },
    hero: {
      alignItems: "center",
      paddingVertical: spacing.lg,
    },
    heroIcon: {
      width: 88,
      height: 88,
      borderRadius: 44,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primarySubtle,
      marginBottom: spacing.md,
    },
    heroLabel: {
      color: colors.primary,
      fontSize: typography.size.xs,
      fontWeight: typography.weight.semibold,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: spacing.xs,
    },
    heroTitle: {
      color: colors.text,
      fontSize: typography.size.xl,
      fontWeight: typography.weight.bold,
      textAlign: "center",
      marginBottom: spacing.sm,
    },
    bodyText: {
      color: colors.textSecondary,
      fontSize: typography.size.sm,
      lineHeight: typography.size.sm * 1.6,
    },
    cta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: spacing.md,
      marginTop: spacing.xs,
    },
    ctaLabel: {
      color: colors.background,
      fontSize: typography.size.md,
      fontWeight: typography.weight.semibold,
      marginLeft: spacing.sm,
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
      marginTop: spacing.sm,
    },
  });
