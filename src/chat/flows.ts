import type { FlowStep, WelcomeChip } from "./types";

/**
 * Scripted admin assistant. There's no model behind this yet — the replies are
 * canned so the widget feels alive and demoable. Swap the state machine's
 * scripted branches for real backend calls when the chat API is ready.
 */

const ADD_STORE_FLOW: FlowStep[] = [
  {
    aiText: "Let's set up a new store. Which brand is opening?",
    mode: "single",
    fieldLabel: "Brand",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "levis", label: "Levi's" },
      { id: "tommy", label: "Tommy Hilfiger" },
      { id: "boss", label: "Hugo Boss" },
    ],
  },
  {
    aiText: "Which category does it belong to?",
    mode: "single",
    fieldLabel: "Category",
    options: [
      { id: "sport", label: "Sportswear" },
      { id: "fashion", label: "Fashion & Apparel" },
      { id: "premium", label: "Premium Fashion" },
      { id: "denim", label: "Fashion & Denim" },
      { id: "luggage", label: "Luggage & Travel" },
    ],
  },
  {
    aiText: "Where will it be located?",
    mode: "single",
    fieldLabel: "Location / Zone",
    options: [
      { id: "a_g", label: "Zone A – Ground Floor" },
      { id: "a_1", label: "Zone A – First Floor" },
      { id: "b_g", label: "Zone B – Ground Floor" },
      { id: "c_g", label: "Zone C – Ground Floor" },
      { id: "d_g", label: "Zone D – Ground Floor" },
    ],
  },
  {
    aiText: "What are the operating hours?",
    mode: "single",
    fieldLabel: "Operating Hours",
    options: [
      { id: "std", label: "10:00 – 20:00" },
      { id: "ext", label: "09:00 – 21:00" },
      { id: "we", label: "Weekends only" },
    ],
  },
  {
    aiText: "Set the initial status.",
    mode: "single",
    fieldLabel: "Status",
    options: [
      { id: "active", label: "Active" },
      { id: "soon", label: "Inactive (opening soon)" },
    ],
  },
  {
    aiText: "All set! Should I create the draft store from these details?",
    mode: "action",
    options: [{ id: "generate", label: "Create draft store" }],
  },
];

const HOURS_FLOW: FlowStep[] = [
  {
    aiText: "Let's update operating hours. Which stores should change?",
    mode: "single",
    fieldLabel: "Scope",
    options: [
      { id: "all", label: "All stores" },
      { id: "za", label: "Zone A" },
      { id: "zb", label: "Zone B" },
      { id: "zc", label: "Zone C" },
      { id: "zd", label: "Zone D" },
    ],
  },
  {
    aiText: "What should the new hours be?",
    mode: "single",
    fieldLabel: "New Hours",
    options: [
      { id: "std", label: "10:00 – 20:00" },
      { id: "ext", label: "09:00 – 21:00" },
      { id: "hol", label: "Holiday hours 11:00 – 18:00" },
    ],
  },
  {
    aiText: "Which days does this apply to?",
    mode: "multi",
    fieldLabel: "Days",
    options: [
      { id: "wd", label: "Weekdays" },
      { id: "sat", label: "Saturday" },
      { id: "sun", label: "Sunday" },
      { id: "hol", label: "Public holidays" },
    ],
  },
  {
    aiText: "Apply this change across the selected stores?",
    mode: "action",
    options: [{ id: "generate", label: "Apply hours update" }],
  },
];

const FIND_FLOW: FlowStep[] = [
  {
    aiText: "Which stores would you like to see?",
    mode: "single",
    fieldLabel: "Filter",
    options: [
      { id: "inactive", label: "Inactive stores" },
      { id: "active", label: "Active stores" },
      { id: "recent", label: "Recently updated" },
    ],
  },
  {
    aiText: "Want me to open that filtered view for you?",
    mode: "action",
    options: [{ id: "generate", label: "Show results" }],
  },
];

const COMING_SOON_FLOW: FlowStep[] = [
  {
    aiText:
      "That workflow isn't wired up in this prototype yet — try \"Add a new store\" for the full demo ✨",
    mode: "action",
    options: [{ id: "ok", label: "Got it" }],
  },
];

export const WELCOME_CHIPS: WelcomeChip[] = [
  {
    id: "add-store",
    label: "Add a new store",
    flow: ADD_STORE_FLOW,
    resultTitle: "Draft store ready",
    resultCta: "Create store",
  },
  {
    id: "hours",
    label: "Update operating hours",
    flow: HOURS_FLOW,
    resultTitle: "Hours update ready",
    resultCta: "Apply update",
  },
  {
    id: "find",
    label: "Find inactive stores",
    flow: FIND_FLOW,
    resultTitle: "Filtered view ready",
    resultCta: "Open directory",
  },
  {
    id: "news",
    label: "Post outlet news",
    flow: COMING_SOON_FLOW,
    resultTitle: "",
    resultCta: "",
  },
  {
    id: "services",
    label: "Review service catalogue",
    flow: COMING_SOON_FLOW,
    resultTitle: "",
    resultCta: "",
  },
  {
    id: "export",
    label: "Export store directory",
    flow: COMING_SOON_FLOW,
    resultTitle: "",
    resultCta: "",
  },
];

/** Delay before each scripted assistant reply, in ms. */
export const THINKING_DELAY_MS = 850;
