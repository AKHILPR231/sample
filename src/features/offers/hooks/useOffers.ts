import { useCallback, useMemo, useState } from "react";

import type { Offer, OfferCategoryId } from "@/features/offers/types";

import { useOfferSource } from "./useOfferSource";

type UseOffersResult = {
  offers: Offer[];
  activeCategory: OfferCategoryId | null;
  toggleCategory: (id: OfferCategoryId) => void;
  clearCategory: () => void;
};

/** Offers with a category filter, backed by the shared offer source. */
export function useOffers(): UseOffersResult {
  const { offers: source } = useOfferSource();
  const [activeCategory, setActiveCategory] = useState<OfferCategoryId | null>(
    null,
  );

  const toggleCategory = useCallback((id: OfferCategoryId) => {
    setActiveCategory((current) => (current === id ? null : id));
  }, []);

  const clearCategory = useCallback(() => setActiveCategory(null), []);

  const offers = useMemo<Offer[]>(() => {
    if (!activeCategory) return source;
    return source.filter(
      (offer) => offer.category?.toLowerCase() === activeCategory,
    );
  }, [source, activeCategory]);

  return { offers, activeCategory, toggleCategory, clearCategory };
}
