import { useMemo } from "react";

import type { BrandCategory } from "@/features/brands/types";

/**
 * STATIC DATA — there is no category collection in the schema, so the Explore
 * Categories grid is defined here. Labels resolve through i18n at render time.
 */
export function useBrandCategories(): BrandCategory[] {
  return useMemo<BrandCategory[]>(
    () => [
      {
        id: "men",
        labelKey: "categoryMen",
        imageUrl: "https://picsum.photos/seed/cat-men/500/500",
        span: 1,
      },
      {
        id: "women",
        labelKey: "categoryWomen",
        imageUrl: "https://picsum.photos/seed/cat-women/500/500",
        span: 1,
      },
      {
        id: "fashionClub",
        labelKey: "categoryFashionClub",
        imageUrl: "https://picsum.photos/seed/cat-fashionclub/900/400",
        span: 2,
      },
      {
        id: "kids",
        labelKey: "categoryKids",
        imageUrl: "https://picsum.photos/seed/cat-kids/500/500",
        span: 1,
      },
      {
        id: "home",
        labelKey: "categoryHome",
        imageUrl: "https://picsum.photos/seed/cat-home/500/500",
        span: 1,
      },
    ],
    [],
  );
}
