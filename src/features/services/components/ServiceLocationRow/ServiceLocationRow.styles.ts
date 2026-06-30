import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    pressed: {
      opacity: 0.6,
    },
    iconWrap: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primarySubtle,
      marginRight: spacing.sm,
    },
    body: {
      flex: 1,
    },
    name: {
      color: colors.text,
      fontSize: typography.size.sm,
      fontWeight: typography.weight.medium,
    },
    location: {
      color: colors.textSecondary,
      fontSize: typography.size.xs,
      marginTop: 1,
    },
    activeName: {
      color: colors.primary,
    },
  });
