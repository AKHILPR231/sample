import { useCallback, useEffect, useRef, useState } from "react";

import {
  THINKING_DELAY_MS,
  WELCOME_CHIPS,
} from "@/features/ai/constants/flows";
import type {
  AnswerKey,
  ChatMessage,
  FlowOption,
  FlowStep,
  WelcomeChip,
} from "@/features/ai/types";
import { matchWelcomeChip } from "@/features/ai/utils/matchChip";

import { useTranslation } from "react-i18next";

let idCounter = 0;
const uid = (): string => `m${Date.now()}_${idCounter++}`;

type Answers = Partial<Record<AnswerKey, string | string[]>>;

type UseAiChatOptions = {
  /** Called when the user confirms itinerary generation. */
  onGenerate: (summaryChips: string[]) => void;
};

type UseAiChatResult = {
  messages: ChatMessage[];
  started: boolean;
  /** True once a scripted flow is running, so the chat has options on screen. */
  flowActive: boolean;
  inputText: string;
  setInputText: (value: string) => void;
  selectWelcomeChip: (chip: WelcomeChip) => void;
  selectSingle: (messageId: string, option: FlowOption) => void;
  toggleMulti: (messageId: string, optionId: string) => void;
  submitMulti: (messageId: string) => void;
  runAction: (messageId: string, option: FlowOption) => void;
  sendFreeText: () => void;
  reset: () => void;
};

/**
 * Drives the scripted conversation: pushes assistant messages, tracks which
 * option block is answered, collects the answers, and hands the summary back
 * when the user asks for an itinerary.
 */
export function useAiChat({ onGenerate }: UseAiChatOptions): UseAiChatResult {
  const { t } = useTranslation();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [flowActive, setFlowActive] = useState(false);

  const flowRef = useRef<FlowStep[] | null>(null);
  const stepRef = useRef(0);
  const answersRef = useRef<Answers>({});
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear any pending scripted replies when the screen goes away.
  useEffect(() => {
    const timers = timersRef;
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current = [];
    };
  }, []);

  const thinkThen = useCallback(
    (callback: () => void, delay: number = THINKING_DELAY_MS) => {
      const thinkingId = uid();
      setMessages((prev) => [...prev, { id: thinkingId, kind: "thinking" }]);

      const timer = setTimeout(() => {
        setMessages((prev) => prev.filter((item) => item.id !== thinkingId));
        callback();
      }, delay);

      timersRef.current.push(timer);
    },
    [],
  );

  const pushStep = useCallback(
    (flow: FlowStep[], index: number) => {
      const step = flow[index];
      if (!step) return;

      setMessages((prev) => [
        ...prev,
        { id: uid(), kind: "ai_text", text: t(step.aiTextKey) },
        {
          id: uid(),
          kind: "options",
          mode: step.mode,
          options: step.options,
          selected: [],
          answered: false,
        },
      ]);
    },
    [t],
  );

  const advance = useCallback(
    (nextIndex: number) => {
      const flow = flowRef.current;
      if (!flow || nextIndex >= flow.length) return;
      stepRef.current = nextIndex;
      thinkThen(() => pushStep(flow, nextIndex));
    },
    [pushStep, thinkThen],
  );

  const markAnswered = useCallback((messageId: string, selected?: string[]) => {
    setMessages((prev) =>
      prev.map((item) =>
        item.id === messageId && item.kind === "options"
          ? { ...item, answered: true, selected: selected ?? item.selected }
          : item,
      ),
    );
  }, []);

  const startFlow = useCallback(
    (chip: WelcomeChip, echoLabel: boolean) => {
      flowRef.current = chip.flow;
      stepRef.current = 0;
      answersRef.current = {};
      setFlowActive(true);

      if (echoLabel) {
        setMessages((prev) => [
          ...prev,
          { id: uid(), kind: "user_text", text: t(chip.labelKey) },
        ]);
      }
      thinkThen(() => pushStep(chip.flow, 0));
    },
    [pushStep, t, thinkThen],
  );

  const selectWelcomeChip = useCallback(
    (chip: WelcomeChip) => startFlow(chip, true),
    [startFlow],
  );

  const selectSingle = useCallback(
    (messageId: string, option: FlowOption) => {
      const label = t(option.labelKey);
      markAnswered(messageId, [option.id]);
      setMessages((prev) => [
        ...prev,
        { id: uid(), kind: "user_text", text: label },
      ]);

      const step = flowRef.current?.[stepRef.current];
      if (step?.answerKey) answersRef.current[step.answerKey] = label;

      advance(stepRef.current + 1);
    },
    [advance, markAnswered, t],
  );

  const toggleMulti = useCallback((messageId: string, optionId: string) => {
    setMessages((prev) =>
      prev.map((item) => {
        if (item.id !== messageId || item.kind !== "options") return item;
        const already = item.selected.includes(optionId);
        return {
          ...item,
          selected: already
            ? item.selected.filter((value) => value !== optionId)
            : [...item.selected, optionId],
        };
      }),
    );
  }, []);

  const submitMulti = useCallback(
    (messageId: string) => {
      const message = messages.find(
        (item) => item.id === messageId && item.kind === "options",
      );
      if (!message || message.kind !== "options") return;

      const labels = message.options
        .filter((option) => message.selected.includes(option.id))
        .map((option) => t(option.labelKey));

      markAnswered(messageId);
      setMessages((prev) => [
        ...prev,
        { id: uid(), kind: "user_text", text: labels.join(", ") },
      ]);

      const step = flowRef.current?.[stepRef.current];
      if (step?.answerKey) answersRef.current[step.answerKey] = labels;

      advance(stepRef.current + 1);
    },
    [advance, markAnswered, messages, t],
  );

  const runAction = useCallback(
    (messageId: string, option: FlowOption) => {
      markAnswered(messageId, [option.id]);
      if (option.id !== "generate") return;

      const { people, time, things, budget } = answersRef.current;
      const chips = [
        people,
        time,
        ...(Array.isArray(things) ? things : []),
        budget,
      ].filter((value): value is string => typeof value === "string");

      onGenerate(chips);
    },
    [markAnswered, onGenerate],
  );

  const sendFreeText = useCallback(() => {
    const text = inputText.trim();
    if (!text) return;

    setInputText("");
    setMessages((prev) => [...prev, { id: uid(), kind: "user_text", text }]);

    // Typing "plan a family day" should behave like tapping the chip.
    const match = matchWelcomeChip(text, WELCOME_CHIPS, (chip) =>
      t(chip.labelKey),
    );

    if (match) {
      startFlow(match, false);
      return;
    }

    thinkThen(() => {
      setMessages((prev) => [
        ...prev,
        { id: uid(), kind: "ai_text", text: t("aiScriptedHint") },
      ]);
    }, 800);
  }, [inputText, startFlow, t, thinkThen]);

  const reset = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
    flowRef.current = null;
    stepRef.current = 0;
    answersRef.current = {};
    setFlowActive(false);
    setMessages([]);
    setInputText("");
  }, []);

  return {
    messages,
    started: messages.length > 0,
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
  };
}
