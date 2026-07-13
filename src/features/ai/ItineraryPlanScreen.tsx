import { useCallback } from "react";
import { ScrollView, View } from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { DEFAULT_SUMMARY_CHIPS } from "@/features/ai/constants/plan";
import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AiBackground } from "./components/AiBackground";
import { AiHeader } from "./components/AiHeader";
import { PlanFooterActions } from "./components/PlanFooterActions";
import { PlanStatsBar } from "./components/PlanStatsBar";
import { PlanSummaryCard } from "./components/PlanSummaryCard";
import { TimelineRow } from "./components/TimelineRow";
import { TimelineStopCard } from "./components/TimelineStopCard";
import { createStyles } from "./ItineraryPlanScreen.styles";
import { useItineraryStore } from "./store/useItineraryStore";

export function ItineraryPlanScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  // Subscribe to slices only, so unrelated store writes don't re-render here.
  const stops = useItineraryStore((state) => state.stops);
  const stats = useItineraryStore((state) => state.stats);
  const summaryChips = useItineraryStore((state) => state.summaryChips);
  const toggleDone = useItineraryStore((state) => state.toggleDone);

  const chips = summaryChips.length > 0 ? summaryChips : DEFAULT_SUMMARY_CHIPS;

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  const handleClose = useCallback(() => {
    router.dismissAll();
  }, []);

  const handleNavigate = useCallback((id: string) => {
    console.log("navigate to stop:", id);
  }, []);

  const handleEditPlan = useCallback(() => {
    router.push("/ai/edit-plan");
  }, []);

  const handleStartDay = useCallback(() => {
    console.log("start your day");
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
          <PlanSummaryCard chips={chips} onShare={handleStartDay} />
          <PlanStatsBar stats={stats} />

          <View style={styles.timeline}>
            {stops.map((stop, index) => (
              <TimelineRow
                key={stop.id}
                time={stop.time}
                boundary={stop.boundary}
                isLast={index === stops.length - 1}
              >
                <TimelineStopCard
                  stop={stop}
                  onToggleDone={toggleDone}
                  onNavigate={handleNavigate}
                />
              </TimelineRow>
            ))}
          </View>
        </ScrollView>

        <PlanFooterActions
          secondaryLabel={t("aiEditPlan")}
          primaryLabel={t("aiStartYourDay")}
          onSecondary={handleEditPlan}
          onPrimary={handleStartDay}
        />
      </View>
    </AiBackground>
  );
}
