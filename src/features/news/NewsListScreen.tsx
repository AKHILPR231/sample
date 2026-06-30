import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  View,
  type ListRenderItem,
} from "react-native";

import { router } from "expo-router";

import { ScreenHeader } from "@/features/services/components/ScreenHeader/ScreenHeader";
import { useNewsArticles } from "@/hooks";
import { useTheme } from "@/hooks/useTheme";

import { EmptyState } from "./components/EmptyState/EmptyState";
import { LoadingSkeleton } from "./components/LoadingSkeleton/LoadingSkeleton";
import { NewsCard } from "./components/NewsCard/NewsCard";
import { LIST_COPY } from "./constants";
import { createStyles } from "./NewsListScreen.styles";
import type { NewsArticle } from "./types";

export function NewsListScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { data: articles, loading, error } = useNewsArticles();
  const [refreshing, setRefreshing] = useState(false);

  const list = (articles ?? []) as NewsArticle[];

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  const handleOpen = useCallback((article: NewsArticle) => {
    router.push(`/news/${article.uid}`);
  }, []);

  // Data is local-first and live via RxDB, so a pull re-reads the current
  // collection and gives the expected native feedback without a network round-trip.
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    const timer = setTimeout(() => setRefreshing(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const keyExtractor = useCallback((item: NewsArticle) => item.uid, []);

  const renderItem = useCallback<ListRenderItem<NewsArticle>>(
    ({ item }) => <NewsCard article={item} onPress={handleOpen} />,
    [handleOpen],
  );

  const header = (
    <ScreenHeader
      title={LIST_COPY.title}
      subtitle={LIST_COPY.subtitle}
      onBack={handleBack}
    />
  );

  if (loading) {
    return (
      <View style={styles.screen}>
        {header}
        <View style={styles.listContent}>
          <LoadingSkeleton />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {header}
      <FlatList
        data={list}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
        ListEmptyComponent={
          error ? (
            <EmptyState
              icon="alert-circle-outline"
              title={LIST_COPY.errorTitle}
              body={LIST_COPY.errorBody}
            />
          ) : (
            <EmptyState
              icon="newspaper-variant-outline"
              title={LIST_COPY.emptyTitle}
              body={LIST_COPY.emptyBody}
            />
          )
        }
      />
    </View>
  );
}
