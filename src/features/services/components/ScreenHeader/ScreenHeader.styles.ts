import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    backButton: {
      width: 40,
      height: 40,
      marginLeft: -spacing.sm,
      alignItems: "center",
      justifyContent: "center",
    },
    titleWrap: {
      flex: 1,
    },
    title: {
      color: colors.text,
      fontSize: typography.size.lg,
      fontWeight: typography.weight.bold,
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: typography.size.sm,
      marginTop: 2,
    },
  });
