import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RewardsHeader } from "./components/RewardsHeader";
import { StampCard } from "./components/StampCard";
import { StampFilterChips } from "./components/StampFilterChips";
import { useStampCards } from "./hooks/useStampCards";
import { createStyles } from "./StampCardsScreen.styles";

export function StampCardsScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const { cards, filters, activeFilter, toggleFilter, clearFilter } =
    useStampCards();
  const [expandedId, setExpandedId] = useState<string>("card_coffee");

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  const handleToggle = useCallback((id: string) => {
    setExpandedId((current) => (current === id ? "" : id));
  }, []);

  const handleRedeem = useCallback((id: string) => {
    console.log("redeem stamp card:", id);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" backgroundColor={theme.colors.charcoal} />
      <RewardsHeader title={t("stampCards")} onBack={handleBack} />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + theme.spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <StampFilterChips
          filters={filters}
          activeFilter={activeFilter}
          onSelect={toggleFilter}
          onClear={clearFilter}
        />

        <View style={styles.cards}>
          {cards.map((card) => (
            <StampCard
              key={card.id}
              card={card}
              expanded={expandedId === card.id}
              onToggle={handleToggle}
              onRedeem={handleRedeem}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
