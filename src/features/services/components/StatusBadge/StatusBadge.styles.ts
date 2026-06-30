import { StyleSheet } from "react-native";

import type { AppTheme } from "@/hooks/useTheme";

export const createStyles = ({ spacing, typography }: AppTheme) =>
  StyleSheet.create({
    badge: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      paddingVertical: 4,
      paddingHorizontal: spacing.sm,
      borderRadius: 12,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: 6,
    },
    label: {
      fontSize: typography.size.xs,
      fontWeight: typography.weight.semibold,
    },
  });
