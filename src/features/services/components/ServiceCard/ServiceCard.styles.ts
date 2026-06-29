import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: 14,
      padding: spacing.md,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 132,
      // Soft elevation — iOS shadow + Android elevation.
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 2,
    },
    pressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
    iconWrap: {
      width: 52,
      height: 52,
      borderRadius: 26,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primarySubtle,
      marginBottom: spacing.sm,
    },
    title: {
      color: colors.text,
      fontSize: typography.size.sm,
      fontWeight: typography.weight.semibold,
      textAlign: "center",
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: typography.size.xs,
      textAlign: "center",
      marginTop: 2,
    },
  });
