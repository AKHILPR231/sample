import { memo } from "react";
import { Image, View } from "react-native";

import type { SimilarBrand } from "@/features/offers/types";
import { useTheme } from "@/hooks/useTheme";

import { createStyles } from "./SimilarBrandCard.styles";

type Props = {
  brand: SimilarBrand;
  width: number;
};

function SimilarBrandCardComponent({ brand, width }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.card, { width }]}>
      <Image
        source={{ uri: brand.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

export const SimilarBrandCard = memo(SimilarBrandCardComponent);
