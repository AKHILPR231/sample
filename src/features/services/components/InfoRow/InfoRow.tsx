import { memo, useMemo } from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { createStyles } from "./InfoRow.styles";
import type { InfoRowProps } from "./InfoRow.types";

function InfoRowBase({ label, value, bullet, last }: InfoRowProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (bullet) {
    return (
      <View style={styles.bulletRow}>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.bulletText}>{value}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.row, last && styles.lastRow]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export const InfoRow = memo(InfoRowBase);
