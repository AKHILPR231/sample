import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    content: {
      paddingBottom: spacing.xxl,
    },
    // Event info block (sits directly under the hero, white, full-bleed).
    infoBlock: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.lg,
      marginBottom: spacing.sm,
    },
    chipRow: {
      marginBottom: spacing.sm,
    },
    title: {
      color: colors.text,
      fontSize: typography.size.xl,
      fontWeight: typography.weight.bold,
      marginBottom: spacing.md,
    },
    dateBox: {
      flexDirection: "row",
      backgroundColor: colors.surface,
      borderRadius: 10,
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    dateCol: {
      flex: 1,
    },
    dateLabel: {
      color: colors.textSecondary,
      fontSize: typography.size.xs,
      marginBottom: spacing.xs,
    },
    dateValue: {
      color: colors.text,
      fontSize: typography.size.sm,
      fontWeight: typography.weight.semibold,
    },
    dateTime: {
      color: colors.textSecondary,
      fontSize: typography.size.xs,
      marginTop: 2,
    },
    cta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.text,
      borderRadius: 8,
      paddingVertical: spacing.md,
    },
    ctaLabel: {
      color: colors.background,
      fontSize: typography.size.sm,
      fontWeight: typography.weight.semibold,
      marginLeft: spacing.sm,
    },
    // Section content
    sectionWrap: {
      paddingHorizontal: spacing.md,
    },
    bodyText: {
      color: colors.textSecondary,
      fontSize: typography.size.sm,
      lineHeight: typography.size.sm * 1.7,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    detailRowLast: {
      borderBottomWidth: 0,
    },
    detailLabel: {
      color: colors.textSecondary,
      fontSize: typography.size.sm,
    },
    detailValue: {
      color: colors.text,
      fontSize: typography.size.sm,
      fontWeight: typography.weight.medium,
      marginLeft: spacing.md,
      flexShrink: 1,
      textAlign: "right",
    },
    centered: {
      flex: 1,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.lg,
    },
  });
