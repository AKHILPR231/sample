export type OptionMode = "single" | "multi" | "action";

export type FlowOption = {
  id: string;
  label: string;
};

export type FlowStep = {
  /** Assistant prompt shown before the options. */
  aiText: string;
  mode: OptionMode;
  options: FlowOption[];
  /** When set, the chosen answer becomes a field on the generated result. */
  fieldLabel?: string;
};

export type WelcomeChip = {
  id: string;
  label: string;
  flow: FlowStep[];
  /** Title + button copy for the generated result card. */
  resultTitle: string;
  resultCta: string;
};

export type ResultField = {
  label: string;
  value: string;
};

export type ChatMessage =
  | { id: string; kind: "user"; text: string }
  | { id: string; kind: "ai"; text: string }
  | { id: string; kind: "thinking" }
  | {
      id: string;
      kind: "options";
      mode: OptionMode;
      options: FlowOption[];
      selected: string[];
      answered: boolean;
    }
  | {
      id: string;
      kind: "result";
      title: string;
      cta: string;
      fields: ResultField[];
      applied: boolean;
    };
