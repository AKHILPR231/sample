import { useCallback } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { SectionHeader } from "@/features/search/components/SectionHeader";
import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { OfferHero } from "./components/OfferHero";
import { SimilarBrandCard } from "./components/SimilarBrandCard";
import { TierBar } from "./components/TierBar";
import { useOfferDetail } from "./hooks/useOfferDetail";
import { createStyles } from "./OfferDetailScreen.styles";

type Props = {
  offerId: string;
};

export function OfferDetailScreen({ offerId }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const offer = useOfferDetail(offerId);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  const handleDiscover = useCallback(() => {
    console.log("discover brand for offer:", offerId);
  }, [offerId]);

  if (!offer) {
    return (
      <View style={styles.centered}>
        <StatusBar style="dark" backgroundColor={theme.colors.webBg1} />
        <Text style={styles.notFound}>{t("offerNotFound")}</Text>
      </View>
    );
  }

  const cardWidth = (width - rw(theme.spacing.lg) * 2 - rw(theme.spacing.md)) / 2;

  return (
    <View style={styles.screen}>
      <StatusBar style="light" backgroundColor={theme.colors.aubergine} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + theme.spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <OfferHero
          imageUrl={offer.imageUrl}
          campaign={offer.campaign}
          onBack={handleBack}
        />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <Text style={styles.brand}>{offer.brand.toUpperCase()}</Text>
          <Text style={styles.title}>{offer.title.toUpperCase()}</Text>
          {offer.validityLabel ? (
            <Text style={styles.validity}>{offer.validityLabel}</Text>
          ) : null}
          <Text style={styles.description}>{offer.description}</Text>

          {offer.tier ? <TierBar tier={offer.tier} /> : null}

          <SectionHeader title={t("similarBrands")} />
          <View style={styles.similarRow}>
            {offer.similarBrands.map((brand) => (
              <SimilarBrandCard key={brand.id} brand={brand} width={cardWidth} />
            ))}
          </View>

          <TouchableOpacity
            style={styles.discover}
            activeOpacity={0.85}
            onPress={handleDiscover}
          >
            <Text style={styles.discoverLabel}>{offer.discoverLabel}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
