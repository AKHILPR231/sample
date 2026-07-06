import { useCallback, useMemo, useState } from "react";

import type {
  StampCard,
  StampFilter,
  StampFilterId,
} from "@/features/stamps/types";

const STATIC_FILTERS: StampFilter[] = [
  { id: "food", labelKey: "stampFilterFood" },
  { id: "drinks", labelKey: "stampFilterDrinks" },
  { id: "menAccessories", labelKey: "stampFilterMenAccessories" },
  { id: "womenApparel", labelKey: "stampFilterWomenApparel" },
];

/**
 * STATIC DATA — there is no stamp-card collection in the schema, so cards are
 * defined here. Titles/subtitles behave like content, not UI labels.
 */
const STATIC_CARDS: StampCard[] = [
  {
    id: "card_coffee",
    title: "Morning Coffee Club",
    subtitle: "Buy 2 coffees, get 1 FREE",
    icon: "cafe-outline",
    collected: 5,
    total: 6,
    validUntil: "31 Nov 2026",
    category: "drinks",
  },
  {
    id: "card_lunch",
    title: "Lunch Deal",
    subtitle: "Collect a stamp with every lunch",
    icon: "fast-food-outline",
    collected: 2,
    total: 6,
    category: "food",
  },
  {
    id: "card_women",
    title: "Women Fashion Deal",
    subtitle: "Collect a stamp with every purchase",
    icon: "shirt-outline",
    collected: 1,
    total: 8,
    category: "womenApparel",
  },
];

type UseStampCardsResult = {
  cards: StampCard[];
  filters: StampFilter[];
  activeFilter: StampFilterId | null;
  toggleFilter: (id: StampFilterId) => void;
  clearFilter: () => void;
};

export function useStampCards(): UseStampCardsResult {
  const [activeFilter, setActiveFilter] = useState<StampFilterId | null>(null);

  const toggleFilter = useCallback((id: StampFilterId) => {
    setActiveFilter((current) => (current === id ? null : id));
  }, []);

  const clearFilter = useCallback(() => setActiveFilter(null), []);

  const cards = useMemo<StampCard[]>(
    () =>
      activeFilter
        ? STATIC_CARDS.filter((card) => card.category === activeFilter)
        : STATIC_CARDS,
    [activeFilter],
  );

  return { cards, filters: STATIC_FILTERS, activeFilter, toggleFilter, clearFilter };
}
