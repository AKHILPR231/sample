import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: spacing.xxl,
      paddingHorizontal: spacing.lg,
    },
    iconWrap: {
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      marginBottom: spacing.md,
    },
    title: {
      color: colors.text,
      fontSize: typography.size.md,
      fontWeight: typography.weight.semibold,
      textAlign: "center",
    },
    body: {
      color: colors.textSecondary,
      fontSize: typography.size.sm,
      textAlign: "center",
      lineHeight: typography.size.sm * 1.5,
      marginTop: spacing.xs,
    },
  });
