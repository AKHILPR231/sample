import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { GENERATING_DURATION_MS } from "@/features/ai/constants/flows";
import { useTheme } from "@/hooks/useTheme";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AiBackground } from "./components/AiBackground";
import { AiHeader } from "./components/AiHeader";
import { ChatInputBar } from "./components/ChatInputBar";
import { GeneratingIndicator } from "./components/GeneratingIndicator";
import { createStyles } from "./GeneratingScreen.styles";

export function GeneratingScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  const [inputText, setInputText] = useState("");

  // Hold the loader briefly, then swap in the generated plan. `replace` keeps
  // the loader out of the back stack.
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/ai/itinerary");
    }, GENERATING_DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  const handleSubmit = useCallback(() => setInputText(""), []);

  return (
    <AiBackground>
      <StatusBar style="dark" />
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <AiHeader onClose={handleClose} />

        <GeneratingIndicator />

        <View style={[styles.inputWrap, { paddingBottom: insets.bottom }]}>
          <ChatInputBar
            value={inputText}
            onChangeText={setInputText}
            onSubmit={handleSubmit}
          />
        </View>
      </View>
    </AiBackground>
  );
}
