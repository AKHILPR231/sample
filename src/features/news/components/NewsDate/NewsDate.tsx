import { memo, useMemo } from "react";
import { Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";

import { formatDate, formatTime } from "../../utils";
import { createStyles } from "./NewsDate.styles";
import type { NewsDateProps } from "./NewsDate.types";

function NewsDateBase({ startIso, showTime }: NewsDateProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const label = useMemo(() => {
    const date = formatDate(startIso);
    if (!date) return "";
    return showTime ? `${date} · ${formatTime(startIso)}` : date;
  }, [startIso, showTime]);

  if (!label) return null;

  return (
    <View style={styles.row}>
      <MaterialCommunityIcons
        name="calendar-blank-outline"
        size={13}
        color={theme.colors.textSecondary}
        style={styles.icon}
      />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

export const NewsDate = memo(NewsDateBase);
