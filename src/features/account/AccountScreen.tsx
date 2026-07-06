import { useCallback } from "react";
import { ScrollView, View } from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useTheme } from "@/hooks/useTheme";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createStyles } from "./AccountScreen.styles";
import { AccountHeader } from "./components/AccountHeader";
import { DigitalWallet } from "./components/DigitalWallet";
import { LoyaltyCard } from "./components/LoyaltyCard";
import { useAccount } from "./hooks/useAccount";

export function AccountScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  const { account } = useAccount();

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  const noop = useCallback((action: string) => {
    console.log("account action:", action);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" backgroundColor={theme.colors.charcoal} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + theme.spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <AccountHeader
          account={account}
          onBack={handleBack}
          onEditProfile={() => noop("edit_profile")}
        />

        <View style={styles.body}>
          <LoyaltyCard
            account={account}
            onRedeem={() => noop("redeem")}
            onViewHistory={() => noop("view_history")}
            onTierPress={() => noop("tier")}
            onQr={() => noop("qr")}
          />
          <DigitalWallet
            onApple={() => noop("apple_wallet")}
            onGoogle={() => noop("google_wallet")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
