import { useEffect, useMemo, useState } from "react";

import { getDatabase } from "@/db";
import type { BrandSlide } from "@/features/brands/types";
import type { StoreDocument } from "@/schemas";

/**
 * STATIC FALLBACK — used when no stores are available in the DB (e.g. before
 * seeding completes, or if the stores collection is empty). Replace/extend as
 * the store catalogue grows.
 */
const STATIC_BRANDS: BrandSlide[] = [
  {
    id: "static_boss",
    name: "BOSS",
    imageUrl: "https://picsum.photos/seed/boss-brand/800/500",
    location: "Ground Floor",
  },
  {
    id: "static_nike",
    name: "Nike",
    imageUrl: "https://picsum.photos/seed/nike-brand/800/500",
    location: "1st Floor",
  },
  {
    id: "static_michaelkors",
    name: "Michael Kors",
    imageUrl: "https://picsum.photos/seed/kors-brand/800/500",
    location: "1st Floor",
  },
];

const MAX_SLIDES = 6;

/**
 * Top brands for the hero carousel. Subscribes to the stores collection and
 * maps stores to brand slides; falls back to static data when empty.
 */
export function useTopBrands(): BrandSlide[] {
  const [stores, setStores] = useState<StoreDocument[]>([]);

  useEffect(() => {
    let sub: { unsubscribe: () => void } | null = null;
    try {
      sub = getDatabase()
        .stores.find()
        .$.subscribe({
          next: (docs) =>
            setStores(docs.map((doc) => doc.toJSON() as StoreDocument)),
          error: () => setStores([]),
        });
    } catch {
      setStores([]);
    }
    return () => sub?.unsubscribe();
  }, []);

  return useMemo<BrandSlide[]>(() => {
    if (stores.length === 0) return STATIC_BRANDS;
    return stores.slice(0, MAX_SLIDES).map((store) => ({
      id: store.store_id,
      name: store.name,
      imageUrl: store.hero_image_url ?? store.logo_url,
      location: store.location_description,
    }));
  }, [stores]);
}
