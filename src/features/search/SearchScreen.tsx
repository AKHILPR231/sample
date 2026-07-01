import { useCallback, useMemo } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import type { SearchResult } from "@/features/search/types";
import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { EmptyState } from "./components/EmptyState";
import { FilterChips } from "./components/FilterChips";
import { SearchBar } from "./components/SearchBar";
import { SearchResultCard } from "./components/SearchResultCard";
import { SectionHeader } from "./components/SectionHeader";
import { useSearch } from "./hooks/useSearch";
import { createStyles } from "./SearchScreen.styles";

import { FlashList } from "@shopify/flash-list";

export function SearchScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const { query, setQuery, activeType, toggleType, results, loading, hasQuery } =
    useSearch();

  const handlePress = useCallback((result: SearchResult) => {
    // Navigation targets are out of scope here — wire these up when the
    // corresponding routes exist.
    console.log("open search result:", result.id);
  }, []);

  const keyExtractor = useCallback((item: SearchResult) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: SearchResult }) => (
      <SearchResultCard result={item} onPress={handlePress} />
    ),
    [handlePress],
  );

  const listContentStyle = useMemo(
    () => ({
      paddingHorizontal: rw(theme.spacing.md),
      paddingBottom: insets.bottom + theme.spacing.xl,
    }),
    [insets.bottom, theme.spacing.md, theme.spacing.xl],
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="dark" backgroundColor={theme.colors.webBg1} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={insets.top}
      >
        <View style={styles.header}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder={t("searchPlaceholder")}
          />
          <FilterChips activeType={activeType} onSelect={toggleType} />
          <SectionHeader
            title={hasQuery ? t("searchResults") : t("popularSearch")}
          />
        </View>

        <FlashList
          data={results}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          estimatedItemSize={rw(96)}
          contentContainerStyle={listContentStyle}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            loading ? null : <EmptyState message={t("noResults")} />
          }
        />
      </KeyboardAvoidingView>
    </View>
  );
}
