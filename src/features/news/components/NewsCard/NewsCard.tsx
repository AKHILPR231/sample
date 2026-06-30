import { memo, useCallback, useMemo } from "react";
import { Pressable, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";

import { NewsCategoryChip } from "../NewsCategoryChip/NewsCategoryChip";
import { NewsDate } from "../NewsDate/NewsDate";
import { NewsImage } from "../NewsImage/NewsImage";
import { createStyles } from "./NewsCard.styles";
import type { NewsCardProps } from "./NewsCard.types";

function NewsCardBase({ article, onPress }: NewsCardProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handlePress = useCallback(() => onPress(article), [article, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${article.title}. ${article.venue_outlet_name ?? ""}`}
    >
      <NewsImage uri={article.image_url} height={180} />

      <View style={styles.body}>
        <View style={styles.chipRow}>
          <NewsCategoryChip type={article.type} />
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>

        {article.short_description ? (
          <Text style={styles.summary} numberOfLines={2}>
            {article.short_description}
          </Text>
        ) : null}

        <View style={styles.footer}>
          <NewsDate startIso={article.start_datetime} />
          {article.venue_outlet_name ? (
            <View style={styles.venue}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={13}
                color={theme.colors.textSecondary}
              />
              <Text style={styles.venueText} numberOfLines={1}>
                {article.venue_outlet_name}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

export const NewsCard = memo(NewsCardBase);
