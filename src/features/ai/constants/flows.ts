import type { FlowStep, WelcomeChip } from "@/features/ai/types";

/**
 * Scripted conversation. There is no model behind this — the assistant replies
 * are canned, which is enough to make the prototype feel alive. All copy is
 * referenced by i18n key and resolved at render time.
 */
export const FAMILY_DAY_OUT_FLOW: FlowStep[] = [
  {
    aiTextKey: "aiAskPeople",
    mode: "single",
    answerKey: "people",
    options: [
      { id: "kids0_5", labelKey: "aiPeopleYoungKids" },
      { id: "kids6_12", labelKey: "aiPeopleChildren" },
      { id: "teens", labelKey: "aiPeopleTeens" },
      { id: "mixed", labelKey: "aiPeopleMixed" },
    ],
  },
  {
    aiTextKey: "aiAskTime",
    mode: "single",
    answerKey: "time",
    options: [
      { id: "3_4", labelKey: "aiTime3to4" },
      { id: "half", labelKey: "aiTimeHalfDay" },
      { id: "full", labelKey: "aiTimeFullDay" },
    ],
  },
  {
    aiTextKey: "aiAskThings",
    mode: "multi",
    answerKey: "things",
    options: [
      { id: "shopping", labelKey: "aiThingShopping" },
      { id: "dining", labelKey: "aiThingDining" },
      { id: "movie", labelKey: "aiThingMovie" },
      { id: "gaming", labelKey: "aiThingGaming" },
      { id: "event", labelKey: "aiThingEvent" },
    ],
  },
  {
    aiTextKey: "aiAskBudget",
    mode: "single",
    answerKey: "budget",
    options: [
      { id: "u50", labelKey: "aiBudgetUnder50" },
      { id: "50_100", labelKey: "aiBudget50to100" },
      { id: "100_200", labelKey: "aiBudget100to200" },
      { id: "200p", labelKey: "aiBudget200Plus" },
    ],
  },
  {
    aiTextKey: "aiAskGenerate",
    mode: "action",
    options: [{ id: "generate", labelKey: "aiGenerateItinerary" }],
  },
];

/**
 * Stub flow for the chips that aren't scripted yet — keeps every button on the
 * welcome screen responsive without needing five full flows.
 */
export const COMING_SOON_FLOW: FlowStep[] = [
  {
    aiTextKey: "aiComingSoon",
    mode: "action",
    options: [{ id: "ok", labelKey: "aiGotIt" }],
  },
];

export const WELCOME_CHIPS: WelcomeChip[] = [
  { id: "birthday", labelKey: "aiChipBirthday", flow: COMING_SOON_FLOW },
  { id: "family", labelKey: "aiChipFamilyDay", flow: FAMILY_DAY_OUT_FLOW },
  { id: "eat", labelKey: "aiChipPlaceToEat", flow: COMING_SOON_FLOW },
  { id: "budget", labelKey: "aiChipBudget", flow: COMING_SOON_FLOW },
  { id: "offers", labelKey: "aiChipOffers", flow: COMING_SOON_FLOW },
  { id: "shoptrip", labelKey: "aiChipShoppingTrip", flow: COMING_SOON_FLOW },
];

/** How long the "Generating your itinerary" screen stays up, in ms. */
export const GENERATING_DURATION_MS = 1000;

/** Delay before each scripted assistant reply, in ms. */
export const THINKING_DELAY_MS = 950;
