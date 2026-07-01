import { memo, useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import type { BrandCategory } from "@/features/brands/types";
import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./CategoryCard.styles";

type Props = {
  category: BrandCategory;
  width: number;
  onPress: (id: string) => void;
};

function CategoryCardComponent({ category, width, onPress }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const handlePress = useCallback(
    () => onPress(category.id),
    [onPress, category.id],
  );

  const height = category.span === 2 ? rw(120) : rw(160);

  return (
    <TouchableOpacity
      style={[styles.card, { width, height }]}
      activeOpacity={0.85}
      onPress={handlePress}
    >
      <Image
        source={{ uri: category.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.scrim} />
      <Text style={styles.label}>{t(category.labelKey)}</Text>
    </TouchableOpacity>
  );
}

export const CategoryCard = memo(CategoryCardComponent);
