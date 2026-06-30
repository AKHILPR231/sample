import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing }: AppTheme) =>
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
    image: {
      width: "100%",
      height: 180,
      backgroundColor: colors.surface,
    },
    body: {
      padding: spacing.md,
    },
    chip: {
      width: 96,
      height: 18,
      borderRadius: 9,
      backgroundColor: colors.surface,
      marginBottom: spacing.sm,
    },
    lineLg: {
      width: "75%",
      height: 16,
      borderRadius: 6,
      backgroundColor: colors.surface,
      marginBottom: spacing.sm,
    },
    line: {
      width: "100%",
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.surface,
      marginBottom: spacing.xs + 2,
    },
    lineShort: {
      width: "40%",
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.surface,
    },
  });
