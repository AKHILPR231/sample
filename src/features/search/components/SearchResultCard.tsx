import { memo, useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { SearchResult } from "@/features/search/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./SearchResultCard.styles";

const TYPE_LABEL_KEY: Record<SearchResult["type"], string> = {
  store: "chipStore",
  movie: "chipMovie",
  event: "chipEvent",
  dining: "chipDining",
};

type Props = {
  result: SearchResult;
  onPress: (result: SearchResult) => void;
};

function SearchResultCardComponent({ result, onPress }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const handlePress = useCallback(() => onPress(result), [onPress, result]);

  const breadcrumb = [
    t(TYPE_LABEL_KEY[result.type]),
    result.category,
    result.location,
  ]
    .filter(Boolean)
    .join("   |   ");

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      {result.imageUrl ? (
        <Image
          source={{ uri: result.imageUrl }}
          style={styles.thumb}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.thumb, styles.thumbFallback]} />
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {result.title}
        </Text>
        <Text style={styles.breadcrumb} numberOfLines={1}>
          {breadcrumb}
        </Text>
      </View>

      <View style={styles.arrow}>
        <Ionicons
          name="arrow-forward"
          size={rf(18)}
          color={theme.colors.viaNavy}
        />
      </View>
    </TouchableOpacity>
  );
}

export const SearchResultCard = memo(SearchResultCardComponent);
