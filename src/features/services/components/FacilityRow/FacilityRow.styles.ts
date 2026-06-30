import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing, typography }: AppTheme) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.xs + 2,
    },
    iconWrap: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primarySubtle,
      marginRight: spacing.sm,
    },
    label: {
      color: colors.text,
      fontSize: typography.size.sm,
      flex: 1,
    },
  });
