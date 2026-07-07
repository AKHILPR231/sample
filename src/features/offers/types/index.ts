/** Normalized offer card model (from promotions/vouchers or static fallback). */
export type Offer = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  /** "Men" | "Women" | "Kids" | "Home" (or a promotion category). */
  category?: string;
  /** Original price label, e.g. "€100.00". */
  priceOld?: string;
  /** Current price label, e.g. "€20.10". */
  priceNow?: string;
  /** Tier badge overlay, e.g. "gold". */
  tier?: string;
  /** ISO date strings. */
  validFrom?: string;
  validUntil?: string;
};

export type OfferCategoryId = "men" | "women" | "kids" | "home";

export type OfferCategory = {
  id: OfferCategoryId;
  labelKey: string;
};

export type SimilarBrand = {
  id: string;
  imageUrl: string;
};

/** Expanded model for the offer detail screen. */
export type OfferDetail = {
  id: string;
  brand: string;
  /** Title with price appended, e.g. "ZWILLING ENFINIGY TOASTER 39,95€". */
  title: string;
  priceLabel?: string;
  validityLabel: string;
  description: string;
  tier?: string;
  imageUrl?: string;
  campaign: string;
  similarBrands: SimilarBrand[];
  discoverLabel: string;
};
