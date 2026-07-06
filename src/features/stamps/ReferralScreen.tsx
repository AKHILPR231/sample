import { useCallback } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { SectionHeader } from "@/features/search/components/SectionHeader";
import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ReferralHero } from "./components/ReferralHero";
import { ReferralRow } from "./components/ReferralRow";
import { ReferralStep } from "./components/ReferralStep";
import { RewardsHeader } from "./components/RewardsHeader";
import { ShareLinkCard } from "./components/ShareLinkCard";
import { useReferral } from "./hooks/useReferral";
import { createStyles } from "./ReferralScreen.styles";

export function ReferralScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const { steps, shareOptions, referrals } = useReferral();

  const stepWidth =
    (width - rw(theme.spacing.lg) * 2 - rw(theme.spacing.md)) / 2;

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  const handleShare = useCallback((id: string) => {
    console.log("share referral via:", id);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" backgroundColor={theme.colors.charcoal} />
      <RewardsHeader
        title={t("referral")}
        onBack={handleBack}
        roundedBottom={false}
      />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={{ paddingBottom: insets.bottom + theme.spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <ReferralHero />

        <View style={styles.body}>
          <View style={styles.steps}>
            {steps.map((step) => (
              <ReferralStep key={step.number} step={step} width={stepWidth} />
            ))}
          </View>

          <ShareLinkCard options={shareOptions} onShare={handleShare} />

          <SectionHeader title={t("yourReferrals")} />
          {referrals.map((entry) => (
            <ReferralRow key={entry.id} entry={entry} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
