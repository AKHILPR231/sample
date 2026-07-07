import { useMemo } from "react";

import type {
  OfferDetail,
  SimilarBrand,
} from "@/features/offers/types";

import { useTranslation } from "react-i18next";

import { useOfferSource } from "./useOfferSource";

type TranslateFn = ReturnType<typeof useTranslation>["t"];

/**
 * STATIC DETAIL SUPPLEMENTS — richer copy shown only on the detail screen
 * (brand, price, tier, long description), keyed by offer id. Offers not listed
 * here fall back to their base fields.
 */
type Supplement = {
  brand?: string;
  priceLabel?: string;
  tier?: string;
  longDescription?: string;
};

const SUPPLEMENTS: Record<string, Supplement> = {
  static_offer_toaster: {
    brand: "Zwilling",
    priceLabel: "39,95€",
    tier: "gold",
    longDescription:
      "Manufacturer's recommended retail price 99,95€, outlet price 69,95€. Exceptions apply. As long as stocks last. Cannot be combined with other promotions. Without guarantee.",
  },
  static_offer_hoodie: {
    brand: "Fashion Club",
    priceLabel: "20,10€",
    tier: "gold",
    longDescription:
      "Manufacturer's recommended retail price 100,00€, outlet price 20,10€. Exceptions apply. As long as stocks last. Cannot be combined with other promotions. Without guarantee.",
  },
  static_offer_jogging: {
    brand: "Fashion Club",
    priceLabel: "16,80€",
    longDescription:
      "Manufacturer's recommended retail price 85,00€, outlet price 16,80€. Exceptions apply. As long as stocks last. Cannot be combined with other promotions. Without guarantee.",
  },
};

const DEFAULT_SIMILAR_BRANDS: SimilarBrand[] = [
  { id: "similar_1", imageUrl: "https://picsum.photos/seed/similar-women/500/500" },
  { id: "similar_2", imageUrl: "https://picsum.photos/seed/similar-men/500/500" },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const parseDate = (iso?: string): { month: string; day: number } | null => {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return { month: MONTHS[date.getUTCMonth()], day: date.getUTCDate() };
};

const validityLabel = (
  from?: string,
  to?: string,
  t?: TranslateFn,
): string => {
  const start = parseDate(from);
  const end = parseDate(to);
  if (!start || !end || !t) return "";
  return t("offerValidFromTo", {
    from: `${start.month} ${start.day}`,
    to: start.month === end.month ? `${end.day}` : `${end.month} ${end.day}`,
  });
};

const deriveBrand = (title: string): string => title.split(" ")[0];

/** Resolves a single offer into the detail view-model. */
export function useOfferDetail(id: string): OfferDetail | null {
  const { offers } = useOfferSource();
  const { t } = useTranslation();

  return useMemo<OfferDetail | null>(() => {
    const base = offers.find((offer) => offer.id === id);
    if (!base) return null;

    const supplement = SUPPLEMENTS[id] ?? {};
    const brand = supplement.brand ?? deriveBrand(base.title);
    const priceLabel = supplement.priceLabel ?? base.priceNow;

    return {
      id: base.id,
      brand,
      title: priceLabel ? `${base.title} ${priceLabel}` : base.title,
      priceLabel,
      validityLabel: validityLabel(base.validFrom, base.validUntil, t),
      description: supplement.longDescription ?? base.description,
      tier: supplement.tier ?? base.tier,
      imageUrl: base.imageUrl,
      campaign: t("offerCampaign"),
      similarBrands: DEFAULT_SIMILAR_BRANDS,
      discoverLabel: t("offerDiscover", { brand: brand.toUpperCase() }),
    };
  }, [offers, id, t]);
}
