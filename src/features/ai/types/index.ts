import type { Ionicons } from "@expo/vector-icons";

import type { ImageSourcePropType } from "react-native";

// ─────────────────────────────────────────────
// Conversation script
// ─────────────────────────────────────────────

export type OptionMode = "single" | "multi" | "action";

export type FlowOption = {
  id: string;
  /** i18n key resolved at render time. */
  labelKey: string;
};

export type FlowStep = {
  /** i18n key for the assistant message. */
  aiTextKey: string;
  mode: OptionMode;
  options: FlowOption[];
  /** Which answer slot this step fills, if any. */
  answerKey?: AnswerKey;
};

export type AnswerKey = "people" | "time" | "things" | "budget";

export type WelcomeChip = {
  id: string;
  labelKey: string;
  flow: FlowStep[];
};

// ─────────────────────────────────────────────
// Chat messages
// ─────────────────────────────────────────────

export type ChatMessage =
  | { id: string; kind: "user_text"; text: string }
  | { id: string; kind: "ai_text"; text: string }
  | { id: string; kind: "thinking" }
  | {
      id: string;
      kind: "options";
      mode: OptionMode;
      options: FlowOption[];
      selected: string[];
      answered: boolean;
    };

export type ChipState = "default" | "selected" | "muted";

// ─────────────────────────────────────────────
// Itinerary plan
// ─────────────────────────────────────────────

export type PlanStop = {
  id: string;
  /** Display time, e.g. "10:10 AM". */
  time: string;
  title: string;
  subtitle: string;
  /** e.g. "Level 1 · 45mins". */
  meta: string;
  icon: keyof typeof Ionicons.glyphMap;
  /** Optional brand logo. Set this to swap the icon for a real logo. */
  logo?: ImageSourcePropType;
  /** Marks the first/last rail labels ("START" / "END"). */
  boundary?: "start" | "end";
  done?: boolean;
};

export type RecommendedStop = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  icon: keyof typeof Ionicons.glyphMap;
  logo?: ImageSourcePropType;
};

export type PlanStats = {
  time: string;
  stops: string;
  savings: string;
};
