import { useCallback, useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import type { ChatMessage } from "@/features/ai/types";
import { useTheme } from "@/hooks/useTheme";

import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createStyles } from "./AiChatScreen.styles";
import { AiBackground } from "./components/AiBackground";
import { AiHeader } from "./components/AiHeader";
import { ChatBubble } from "./components/ChatBubble";
import { ChatInputBar } from "./components/ChatInputBar";
import { OptionsBlock } from "./components/OptionsBlock";
import { SuggestionChips } from "./components/SuggestionChips";
import { ThinkingIndicator } from "./components/ThinkingIndicator";
import { WelcomePanel } from "./components/WelcomePanel";
import { useAiChat } from "./hooks/useAiChat";
import { useItineraryStore } from "./store/useItineraryStore";

export function AiChatScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  const setSummaryChips = useItineraryStore((state) => state.setSummaryChips);
  const resetPlan = useItineraryStore((state) => state.reset);

  const handleGenerate = useCallback(
    (chips: string[]) => {
      resetPlan();
      setSummaryChips(chips);
      router.push("/ai/generating");
    },
    [resetPlan, setSummaryChips],
  );

  const {
    messages,
    started,
    flowActive,
    inputText,
    setInputText,
    selectWelcomeChip,
    selectSingle,
    toggleMulti,
    submitMulti,
    runAction,
    sendFreeText,
    reset,
  } = useAiChat({ onGenerate: handleGenerate });

  const handleClose = useCallback(() => {
    if (started) {
      reset();
      return;
    }
    if (router.canGoBack()) router.back();
  }, [started, reset]);

  const handleContentSizeChange = useCallback(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, []);

  const renderMessage = useCallback(
    (message: ChatMessage) => {
      switch (message.kind) {
        case "ai_text":
        case "user_text":
          return (
            <Animated.View key={message.id} entering={FadeInDown.duration(260)}>
              <ChatBubble
                text={message.text}
                variant={message.kind === "user_text" ? "user" : "ai"}
              />
            </Animated.View>
          );
        case "thinking":
          return (
            <Animated.View key={message.id} entering={FadeInDown.duration(260)}>
              <ThinkingIndicator />
            </Animated.View>
          );
        case "options":
          return (
            <Animated.View key={message.id} entering={FadeInDown.duration(260)}>
              <OptionsBlock
                message={message}
                onSingle={selectSingle}
                onToggle={toggleMulti}
                onSubmit={submitMulti}
                onAction={runAction}
              />
            </Animated.View>
          );
        default:
          return null;
      }
    },
    [runAction, selectSingle, submitMulti, toggleMulti],
  );

  return (
    <AiBackground>
      <StatusBar style="dark" />
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <AiHeader onClose={handleClose} />

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={insets.top}
        >
          {started ? (
            <ScrollView
              ref={scrollRef}
              style={styles.flex}
              contentContainerStyle={styles.chatContent}
              onContentSizeChange={handleContentSizeChange}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {messages.map(renderMessage)}

              {/* No flow running — keep the suggestions reachable so the
                  conversation can never dead-end. */}
              {!flowActive ? (
                <SuggestionChips compact onSelect={selectWelcomeChip} />
              ) : null}
            </ScrollView>
          ) : (
            <WelcomePanel onSelect={selectWelcomeChip} />
          )}

          <View style={[styles.inputWrap, { paddingBottom: insets.bottom }]}>
            <ChatInputBar
              value={inputText}
              onChangeText={setInputText}
              onSubmit={sendFreeText}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </AiBackground>
  );
}
