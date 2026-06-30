import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ colors, spacing }: AppTheme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    listContent: {
      padding: spacing.md,
      paddingBottom: spacing.xl,
      flexGrow: 1,
    },
  });
