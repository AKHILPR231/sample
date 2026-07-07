import { useMemo } from "react";

import type { HelpFaq, HelpStep } from "@/features/help/types";

type HelpContent = {
  steps: HelpStep[];
  faqs: HelpFaq[];
};

/**
 * STATIC DATA — help/FAQ content is not stored in the schema, so it is defined
 * here. Text resolves through i18n at render time.
 */
export function useHelpContent(): HelpContent {
  return useMemo<HelpContent>(
    () => ({
      steps: [
        { number: 1, textKey: "helpRedeemStep1" },
        { number: 2, textKey: "helpRedeemStep2" },
        { number: 3, textKey: "helpRedeemStep3" },
      ],
      faqs: [
        { id: "cashback", questionKey: "helpFaqCashback" },
        { id: "convert", questionKey: "helpFaqConvert" },
      ],
    }),
    [],
  );
}
