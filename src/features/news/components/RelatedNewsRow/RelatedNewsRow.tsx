import { memo, useCallback, useMemo } from "react";
import { Pressable, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";

import { formatDateRange } from "../../utils";
import { createStyles } from "./RelatedNewsRow.styles";
import type { RelatedNewsRowProps } from "./RelatedNewsRow.types";

function RelatedNewsRowBase({ article, onPress, last }: RelatedNewsRowProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const dateLabel = useMemo(
    () => formatDateRange(article.start_datetime, article.end_datetime),
    [article.start_datetime, article.end_datetime],
  );

  const handlePress = useCallback(() => onPress(article), [article, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.row,
        last && styles.lastRow,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${article.title}, ${dateLabel}`}
    >
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {article.title}
        </Text>
        <Text style={styles.date}>{dateLabel}</Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={theme.colors.textSecondary}
      />
    </Pressable>
  );
}

export const RelatedNewsRow = memo(RelatedNewsRowBase);
