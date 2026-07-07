import { useCallback } from "react";
import { SectionList, Text, View } from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import type {
  TransactionSection,
  TransactionView,
} from "@/features/history/types";
import { useTheme } from "@/hooks/useTheme";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HistoryFilterChips } from "./components/HistoryFilterChips";
import { HistoryHeader } from "./components/HistoryHeader";
import { TransactionRow } from "./components/TransactionRow";
import { createStyles } from "./HistoryScreen.styles";
import { useTransactionHistory } from "./hooks/useTransactionHistory";

export function HistoryScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  const { sections, filter, setFilter } = useTransactionHistory();

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  const keyExtractor = useCallback((item: TransactionView) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: TransactionView }) => <TransactionRow txn={item} />,
    [],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: TransactionSection }) => (
      <Text style={styles.sectionHeader}>{section.dateLabel}</Text>
    ),
    [styles.sectionHeader],
  );

  return (
    <View style={styles.screen}>
      <StatusBar style="light" backgroundColor={theme.colors.charcoal} />
      <HistoryHeader onBack={handleBack} />

      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={
          <HistoryFilterChips filter={filter} onChange={setFilter} />
        }
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + theme.spacing.xl },
        ]}
      />
    </View>
  );
}
