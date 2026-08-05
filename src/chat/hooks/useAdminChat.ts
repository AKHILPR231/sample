import { useCallback, useEffect, useRef, useState } from "react";

import { THINKING_DELAY_MS, WELCOME_CHIPS } from "../flows";
import { matchWelcomeChip } from "../matchChip";
import type {
  ChatMessage,
  FlowOption,
  FlowStep,
  ResultField,
  WelcomeChip,
} from "../types";

let idCounter = 0;
const uid = (): string => `m${Date.now()}_${idCounter++}`;

export type UseAdminChat = ReturnType<typeof useAdminChat>;

/**
 * Drives the scripted admin conversation: pushes assistant messages, tracks
 * which option block is answered, collects answers into result fields, and
 * renders an inline draft-result card when the user confirms.
 */
export function useAdminChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [flowActive, setFlowActive] = useState(false);

  const flowRef = useRef<FlowStep[] | null>(null);
  const stepRef = useRef(0);
  const chipRef = useRef<WelcomeChip | null>(null);
  const fieldsRef = useRef<ResultField[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

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

  const pushStep = useCallback((flow: FlowStep[], index: number) => {
    const step = flow[index];
    if (!step) return;
    setMessages((prev) => [
      ...prev,
      { id: uid(), kind: "ai", text: step.aiText },
      {
        id: uid(),
        kind: "options",
        mode: step.mode,
        options: step.options,
        selected: [],
        answered: false,
      },
    ]);
  }, []);

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

  const recordField = useCallback((value: string) => {
    const step = flowRef.current?.[stepRef.current];
    if (step?.fieldLabel) {
      fieldsRef.current = [
        ...fieldsRef.current,
        { label: step.fieldLabel, value },
      ];
    }
  }, []);

  const startFlow = useCallback(
    (chip: WelcomeChip, echoLabel: boolean) => {
      flowRef.current = chip.flow;
      chipRef.current = chip;
      stepRef.current = 0;
      fieldsRef.current = [];
      setFlowActive(true);

      if (echoLabel) {
        setMessages((prev) => [
          ...prev,
          { id: uid(), kind: "user", text: chip.label },
        ]);
      }
      thinkThen(() => pushStep(chip.flow, 0));
    },
    [pushStep, thinkThen],
  );

  const selectWelcomeChip = useCallback(
    (chip: WelcomeChip) => startFlow(chip, true),
    [startFlow],
  );

  const selectSingle = useCallback(
    (messageId: string, option: FlowOption) => {
      markAnswered(messageId, [option.id]);
      setMessages((prev) => [
        ...prev,
        { id: uid(), kind: "user", text: option.label },
      ]);
      recordField(option.label);
      advance(stepRef.current + 1);
    },
    [advance, markAnswered, recordField],
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
        .map((option) => option.label);

      markAnswered(messageId);
      setMessages((prev) => [
        ...prev,
        { id: uid(), kind: "user", text: labels.join(", ") },
      ]);
      recordField(labels.join(", "));
      advance(stepRef.current + 1);
    },
    [advance, markAnswered, messages, recordField],
  );

  const runAction = useCallback(
    (messageId: string, option: FlowOption) => {
      markAnswered(messageId, [option.id]);
      if (option.id !== "generate") return;

      const chip = chipRef.current;
      const fields = fieldsRef.current;
      thinkThen(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            kind: "result",
            title: chip?.resultTitle || "Ready",
            cta: chip?.resultCta || "Confirm",
            fields,
            applied: false,
          },
        ]);
      });
    },
    [markAnswered, thinkThen],
  );

  const applyResult = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((item) =>
        item.id === messageId && item.kind === "result"
          ? { ...item, applied: true }
          : item,
      ),
    );
    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        kind: "ai",
        text: "Done ✓ Your changes are saved as a draft — open the Store Directory to review and publish.",
      },
    ]);
  }, []);

  const sendFreeText = useCallback(() => {
    const text = inputText.trim();
    if (!text) return;

    setInputText("");
    setMessages((prev) => [...prev, { id: uid(), kind: "user", text }]);

    const match = matchWelcomeChip(text, WELCOME_CHIPS);
    if (match) {
      startFlow(match, false);
      return;
    }

    thinkThen(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          kind: "ai",
          text: "This assistant follows a scripted demo flow — pick one of the suggestions below and I'll walk you through it 🙂",
        },
      ]);
    }, 700);
  }, [inputText, startFlow, thinkThen]);

  const reset = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
    flowRef.current = null;
    chipRef.current = null;
    stepRef.current = 0;
    fieldsRef.current = [];
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
    applyResult,
    sendFreeText,
    reset,
  };
}
