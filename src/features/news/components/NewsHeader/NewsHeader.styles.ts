import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
      paddingHorizontal: spacing.sm,
      paddingBottom: spacing.sm,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: 40,
    },
    iconButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      flex: 1,
      textAlign: "center",
      color: colors.text,
      fontSize: typography.size.md,
      fontWeight: typography.weight.semibold,
    },
    spacer: {
      width: 40,
      height: 40,
    },
  });
