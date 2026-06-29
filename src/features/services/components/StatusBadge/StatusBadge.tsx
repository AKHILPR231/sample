import { memo, useMemo } from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import type { ServiceDocument } from "@/schemas";

import { createStyles } from "./StatusBadge.styles";
import type { StatusBadgeProps } from "./StatusBadge.types";

const LABELS: Record<ServiceDocument["status"], string> = {
  operational: "Open now",
  under_maintenance: "Under maintenance",
  closed: "Closed",
};

function StatusBadgeBase({ status }: StatusBadgeProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Tones are derived from theme tokens (no hardcoded colours): operational
  // reads as the accent; everything else falls back to a neutral.
  const isOperational = status === "operational";
  const fg = isOperational ? theme.colors.primary : theme.colors.textSecondary;
  const bg = isOperational ? theme.colors.primarySubtle : theme.colors.surface;

  return (
    <View
      style={[styles.badge, { backgroundColor: bg }]}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${LABELS[status]}`}
    >
      <View style={[styles.dot, { backgroundColor: fg }]} />
      <Text style={[styles.label, { color: fg }]}>{LABELS[status]}</Text>
    </View>
  );
}

export const StatusBadge = memo(StatusBadgeBase);
