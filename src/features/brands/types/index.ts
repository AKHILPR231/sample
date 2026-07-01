/** A slide in the Top Brands hero carousel. */
export type BrandSlide = {
  id: string;
  name: string;
  imageUrl?: string;
  /** e.g. "Ground Floor", "Block A". */
  location: string;
};

/** A card in the Explore Categories grid. */
export type BrandCategory = {
  id: string;
  labelKey: string;
  imageUrl: string;
  /** 1 = half-width card, 2 = full-width card. */
  span: 1 | 2;
};
