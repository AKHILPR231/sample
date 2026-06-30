import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    chip: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      backgroundColor: colors.primarySubtle,
      borderRadius: 14,
      paddingVertical: 4,
      paddingHorizontal: spacing.sm,
    },
    chipCompact: {
      paddingVertical: 3,
      paddingHorizontal: spacing.sm,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      color: colors.primary,
      fontSize: typography.size.xs,
      fontWeight: typography.weight.semibold,
    },
  });
