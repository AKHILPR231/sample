import { Image, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createStyles } from "./OfferHero.styles";

type Props = {
  imageUrl?: string;
  campaign: string;
  onBack: () => void;
};

export function OfferHero({ imageUrl, campaign, onBack }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.hero}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.imageFallback]} />
      )}

      <View style={[styles.banner, { paddingTop: insets.top }]}>
        <Text style={styles.bannerText} numberOfLines={1}>
          {campaign.toUpperCase()}
        </Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>XXL</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.back, { top: insets.top + theme.spacing.sm }]}
        activeOpacity={0.8}
        onPress={onBack}
      >
        <Ionicons
          name="chevron-back"
          size={rf(20)}
          color={theme.colors.viaNavy}
        />
      </TouchableOpacity>
    </View>
  );
}
