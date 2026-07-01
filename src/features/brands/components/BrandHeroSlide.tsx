import { memo, useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { BrandSlide } from "@/features/brands/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { createStyles } from "./BrandHeroSlide.styles";

type Props = {
  slide: BrandSlide;
  width: number;
  onPress: (id: string) => void;
};

function BrandHeroSlideComponent({ slide, width, onPress }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const handlePress = useCallback(() => onPress(slide.id), [onPress, slide.id]);

  return (
    <View style={[styles.slide, { width }]}>
      {slide.imageUrl ? (
        <Image
          source={{ uri: slide.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.imageFallback]} />
      )}

      <View style={styles.footer}>
        <View style={styles.footerText}>
          <Text style={styles.name} numberOfLines={1}>
            {slide.name.toUpperCase()}
          </Text>
          <Text style={styles.location} numberOfLines={1}>
            {slide.location}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.arrow}
          activeOpacity={0.8}
          onPress={handlePress}
        >
          <Ionicons
            name="arrow-forward"
            size={rf(18)}
            color={theme.colors.viaNavy}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const BrandHeroSlide = memo(BrandHeroSlideComponent);
