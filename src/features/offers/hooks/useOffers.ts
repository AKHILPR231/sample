import { useCallback, useEffect, useMemo, useState } from "react";

import { getDatabase } from "@/db";
import type { Offer, OfferCategoryId } from "@/features/offers/types";
import type { PromotionDocument } from "@/schemas";

/**
 * STATIC FALLBACK — used when the promotions collection is empty. Content
 * strings mirror the design; they behave like seed data, not UI labels.
 */
const STATIC_OFFERS: Offer[] = [
  {
    id: "static_offer_toaster",
    title: "Zwilling Enfinigy Toaster",
    description:
      "All information without guarantee. The respective offer conditions apply. Click here for more information.",
    imageUrl: "https://picsum.photos/seed/offer-toaster/400/400",
    category: "Home",
    validFrom: "2026-07-03",
    validUntil: "2026-07-04",
  },
  {
    id: "static_offer_chalet",
    title: "Scuffette Chalet",
    description:
      "All information without guarantee. The respective offer conditions apply. Click here for more information.",
    imageUrl: "https://picsum.photos/seed/offer-chalet/400/400",
    category: "Women",
    validFrom: "2026-07-03",
    validUntil: "2026-07-04",
  },
  {
    id: "static_offer_hoodie",
    title: "Hoodie - U Cartoon",
    description:
      "All information without guarantee. The respective offer conditions apply.",
    imageUrl: "https://picsum.photos/seed/offer-hoodie/400/400",
    category: "Men",
    priceOld: "€100.00",
    priceNow: "€20.10",
    tier: "gold",
    validFrom: "2026-07-03",
    validUntil: "2026-07-04",
  },
  {
    id: "static_offer_jogging",
    title: "Jogging Pants",
    description:
      "All information without guarantee. The respective offer conditions apply.",
    imageUrl: "https://picsum.photos/seed/offer-jogging/400/400",
    category: "Men",
    priceOld: "€85.00",
    priceNow: "€16.80",
    validFrom: "2026-07-03",
    validUntil: "2026-07-04",
  },
];

const mapPromotion = (promo: PromotionDocument): Offer => ({
  id: promo.uid,
  title: promo.headline?.replace(/\n/g, " ") ?? promo.title,
  description: promo.body_copy ?? promo.terms_and_conditions ?? "",
  imageUrl: promo.hero_image_url,
  category: promo.applicable_categories?.[0],
  priceNow: promo.sub_headline,
  validFrom: promo.valid_from,
  validUntil: promo.valid_until,
});

type UseOffersResult = {
  offers: Offer[];
  activeCategory: OfferCategoryId | null;
  toggleCategory: (id: OfferCategoryId) => void;
  clearCategory: () => void;
};

/** Active promotions mapped to offers, with a category filter. */
export function useOffers(): UseOffersResult {
  const [promotions, setPromotions] = useState<PromotionDocument[]>([]);
  const [activeCategory, setActiveCategory] = useState<OfferCategoryId | null>(
    null,
  );

  useEffect(() => {
    let sub: { unsubscribe: () => void } | null = null;
    try {
      sub = getDatabase()
        .promotions.find({ selector: { status: { $eq: "active" } } })
        .$.subscribe({
          next: (docs) =>
            setPromotions(docs.map((doc) => doc.toJSON() as PromotionDocument)),
          error: () => setPromotions([]),
        });
    } catch {
      setPromotions([]);
    }
    return () => sub?.unsubscribe();
  }, []);

  const toggleCategory = useCallback((id: OfferCategoryId) => {
    setActiveCategory((current) => (current === id ? null : id));
  }, []);

  const clearCategory = useCallback(() => setActiveCategory(null), []);

  const offers = useMemo<Offer[]>(() => {
    const base =
      promotions.length > 0 ? promotions.map(mapPromotion) : STATIC_OFFERS;
    if (!activeCategory) return base;
    return base.filter(
      (offer) => offer.category?.toLowerCase() === activeCategory,
    );
  }, [promotions, activeCategory]);

  return { offers, activeCategory, toggleCategory, clearCategory };
}
