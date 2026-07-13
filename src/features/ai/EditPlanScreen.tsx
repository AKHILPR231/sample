import { useCallback } from "react";
import { ScrollView, Text, View } from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
  DEFAULT_SUMMARY_CHIPS,
  PLAN_AVAILABLE_MINUTES,
  PLAN_TOTAL_TIME,
} from "@/features/ai/constants/plan";
import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AiBackground } from "./components/AiBackground";
import { AiHeader } from "./components/AiHeader";
import { AvailableTimeBar } from "./components/AvailableTimeBar";
import { EditableStopCard } from "./components/EditableStopCard";
import { PlanFooterActions } from "./components/PlanFooterActions";
import { PlanStatsBar } from "./components/PlanStatsBar";
import { PlanSummaryCard } from "./components/PlanSummaryCard";
import { RecommendedStopRow } from "./components/RecommendedStopRow";
import { TimelineRow } from "./components/TimelineRow";
import { createStyles } from "./EditPlanScreen.styles";
import { useItineraryStore } from "./store/useItineraryStore";

export function EditPlanScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const stops = useItineraryStore((state) => state.stops);
  const stats = useItineraryStore((state) => state.stats);
  const recommended = useItineraryStore((state) => state.recommended);
  const summaryChips = useItineraryStore((state) => state.summaryChips);
  const removeStop = useItineraryStore((state) => state.removeStop);
  const addRecommended = useItineraryStore((state) => state.addRecommended);

  const chips = summaryChips.length > 0 ? summaryChips : DEFAULT_SUMMARY_CHIPS;

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  const handleClose = useCallback(() => {
    router.dismissAll();
  }, []);

  const handleAddStop = useCallback(() => {
    console.log("add a custom stop");
  }, []);

  // Saving just returns to the plan — the store already holds the edits.
  const handleSave = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  return (
    <AiBackground>
      <StatusBar style="dark" />
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <AiHeader showBack onBack={handleBack} onClose={handleClose} />

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <PlanSummaryCard chips={chips} />
          <PlanStatsBar stats={stats} />

          <View style={styles.timeline}>
            {stops.map((stop, index) => (
              <TimelineRow
                key={stop.id}
                time={stop.time}
                boundary={stop.boundary}
                isLast={index === stops.length - 1}
              >
                <EditableStopCard stop={stop} onRemove={removeStop} />
              </TimelineRow>
            ))}
          </View>

          <AvailableTimeBar
            available={PLAN_AVAILABLE_MINUTES}
            total={PLAN_TOTAL_TIME}
          />

          {recommended.length > 0 ? (
            <View style={styles.recommended}>
              <Text style={styles.recommendedBadge}>{t("aiRecommended")}</Text>
              {recommended.map((stop) => (
                <RecommendedStopRow
                  key={stop.id}
                  stop={stop}
                  onAdd={addRecommended}
                />
              ))}
            </View>
          ) : null}
        </ScrollView>

        <PlanFooterActions
          secondaryLabel={t("aiAddStop")}
          primaryLabel={t("aiSaveChanges")}
          onSecondary={handleAddStop}
          onPrimary={handleSave}
        />
      </View>
    </AiBackground>
  );
}
