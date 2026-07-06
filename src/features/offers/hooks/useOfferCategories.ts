import { useMemo } from "react";

import type { OfferCategory } from "@/features/offers/types";

/** Static filter chips for the offers screen. */
export function useOfferCategories(): OfferCategory[] {
  return useMemo<OfferCategory[]>(
    () => [
      { id: "men", labelKey: "offerCategoryMen" },
      { id: "women", labelKey: "offerCategoryWomen" },
      { id: "kids", labelKey: "offerCategoryKids" },
      { id: "home", labelKey: "offerCategoryHome" },
    ],
    [],
  );
}
