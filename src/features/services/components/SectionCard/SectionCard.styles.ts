import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background,
      borderRadius: 14,
      padding: spacing.md,
      marginBottom: spacing.md,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 2,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    icon: {
      marginRight: spacing.sm,
    },
    title: {
      color: colors.text,
      fontSize: typography.size.md,
      fontWeight: typography.weight.semibold,
    },
  });
