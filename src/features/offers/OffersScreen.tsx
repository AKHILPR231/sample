import { useCallback } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import type { Offer } from "@/features/offers/types";
import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { OfferCard } from "./components/OfferCard";
import { OfferFilterChips } from "./components/OfferFilterChips";
import { ScreenHeader } from "./components/ScreenHeader";
import { useOfferCategories } from "./hooks/useOfferCategories";
import { useOffers } from "./hooks/useOffers";
import { createStyles } from "./OffersScreen.styles";

export function OffersScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const { offers, activeCategory, toggleCategory, clearCategory } = useOffers();
  const categories = useOfferCategories();

  const horizontal = rw(theme.spacing.md);
  const gap = rw(theme.spacing.md);
  const cardWidth = (width - horizontal * 2 - gap) / 2;

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  const handleOfferPress = useCallback((id: string) => {
    console.log("open offer:", id);
  }, []);

  const keyExtractor = useCallback((item: Offer) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Offer }) => (
      <OfferCard offer={item} width={cardWidth} onPress={handleOfferPress} />
    ),
    [cardWidth, handleOfferPress],
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="dark" backgroundColor={theme.colors.webBg1} />

      <View style={styles.headerArea}>
        <ScreenHeader title={t("myOffers")} onBack={handleBack} />
        <View style={styles.chips}>
          <OfferFilterChips
            categories={categories}
            activeCategory={activeCategory}
            onSelect={toggleCategory}
            onClear={clearCategory}
          />
        </View>
      </View>

      <FlatList
        data={offers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + theme.spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={7}
      />
    </View>
  );
}
