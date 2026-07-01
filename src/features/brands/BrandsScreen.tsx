import { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import { SearchBar } from "@/features/search/components/SearchBar";
import { SectionHeader } from "@/features/search/components/SectionHeader";
import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createStyles } from "./BrandsScreen.styles";
import { BrandHeroCarousel } from "./components/BrandHeroCarousel";
import { CategoryCard } from "./components/CategoryCard";
import { PromoBanner } from "./components/PromoBanner";
import { useBrandCategories } from "./hooks/useBrandCategories";
import { useTopBrands } from "./hooks/useTopBrands";

export function BrandsScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const [query, setQuery] = useState("");
  const brands = useTopBrands();
  const categories = useBrandCategories();

  const gap = rw(theme.spacing.md);
  const horizontal = rw(theme.spacing.md);
  const fullWidth = width - horizontal * 2;
  const halfWidth = (fullWidth - gap) / 2;

  const handleBrandPress = useCallback((id: string) => {
    console.log("open brand:", id);
  }, []);

  const handleCategoryPress = useCallback((id: string) => {
    console.log("open category:", id);
  }, []);

  const handleJoin = useCallback(() => {
    console.log("join fashion club");
  }, []);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="dark" backgroundColor={theme.colors.webBg1} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={insets.top}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: insets.bottom + theme.spacing.xl },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder={t("searchBrandPlaceholder")}
          />

          <SectionHeader title={t("topBrands")} />
          <BrandHeroCarousel slides={brands} onPressBrand={handleBrandPress} />

          <PromoBanner onPressJoin={handleJoin} />

          <SectionHeader title={t("exploreCategories")} />
          <View style={[styles.grid, { gap }]}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                width={category.span === 2 ? fullWidth : halfWidth}
                onPress={handleCategoryPress}
              />
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
