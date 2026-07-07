import { useCallback } from "react";
import { ScrollView, View } from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { SectionHeader } from "@/features/search/components/SectionHeader";
import { RewardsHeader } from "@/features/stamps/components/RewardsHeader";
import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HelpLinkRow } from "./components/HelpLinkRow";
import { HelpStepCard } from "./components/HelpStepCard";
import { createStyles } from "./HelpSupportScreen.styles";
import { useHelpContent } from "./hooks/useHelpContent";

export function HelpSupportScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const { steps, faqs } = useHelpContent();

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  const handleFaqPress = useCallback((id: string) => {
    console.log("open faq:", id);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" backgroundColor={theme.colors.charcoal} />
      <RewardsHeader title={t("helpSupport")} onBack={handleBack} />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + theme.spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title={t("howToRedeem")} />
        {steps.map((step) => (
          <HelpStepCard key={step.number} step={step} />
        ))}

        <SectionHeader title={t("needHelp")} />
        {faqs.map((faq) => (
          <HelpLinkRow key={faq.id} faq={faq} onPress={handleFaqPress} />
        ))}
      </ScrollView>
    </View>
  );
}
