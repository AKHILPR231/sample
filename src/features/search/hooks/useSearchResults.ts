import { useMemo } from "react";

import type { SearchResult } from "@/features/search/types";
import { useStores, useUpcomingEvents } from "@/hooks";
import type { EventDocument, StoreDocument } from "@/schemas";

/**
 * Outlet the search is scoped to. In production, resolve this from the
 * customer's `preferred_outlet_id` / the currently selected outlet. Batavia
 * Stad (mall_002) is the current customer's preferred outlet and the richest
 * seed, so we scope to it here.
 */
export const SEARCH_OUTLET_ID = "mall_002";

/**
 * STATIC PLACEHOLDER DATA — the schema/seeds have no cinema/movie or dining
 * collection, so Movie and Dining results are supplemented here purely so the
 * corresponding filter chips have something to show in the demo. Replace with
 * real collections/queries once they exist.
 */
const STATIC_SUPPLEMENTS: SearchResult[] = [
  {
    id: "static_movie_hexled",
    title: "Hexled",
    imageUrl: "https://picsum.photos/seed/hexled/200/200",
    type: "movie",
    category: "Animation",
    location: "2nd Floor",
  },
  {
    id: "static_movie_novaskies",
    title: "Nova Skies",
    imageUrl: "https://picsum.photos/seed/novaskies/200/200",
    type: "movie",
    category: "Adventure",
    location: "2nd Floor",
  },
  {
    id: "static_dining_mcdonalds",
    title: "McDonald's",
    imageUrl: "https://picsum.photos/seed/mcdonalds/200/200",
    type: "dining",
    category: "Restaurant",
    location: "2nd Floor",
  },
  {
    id: "static_dining_freshgreens",
    title: "Fresh Greens",
    imageUrl: "https://picsum.photos/seed/freshgreens/200/200",
    type: "dining",
    category: "Healthy",
    location: "1st Floor",
  },
];

/** "family_event" -> "Family Event" */
const humanizeEventType = (value: string): string =>
  value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

type SearchResultsResult = {
  results: SearchResult[];
  loading: boolean;
};

/** Live stores + upcoming events for the outlet, normalized and merged. */
export function useSearchResults(): SearchResultsResult {
  const { data: stores, loading: storesLoading } = useStores(SEARCH_OUTLET_ID);
  const { data: events, loading: eventsLoading } =
    useUpcomingEvents(SEARCH_OUTLET_ID);

  const results = useMemo<SearchResult[]>(() => {
    const storeResults: SearchResult[] = (stores ?? []).map(
      (store: StoreDocument) => ({
        id: store.store_id,
        title: store.name,
        imageUrl: store.logo_url ?? store.hero_image_url,
        type: "store",
        category: store.category,
        location: store.location_description,
      }),
    );

    const eventResults: SearchResult[] = (events ?? []).map(
      (event: EventDocument) => ({
        id: event.uid,
        title: event.title,
        imageUrl: event.image_url,
        type: "event",
        category: humanizeEventType(event.type),
        location: event.location_in_outlet ?? "",
      }),
    );

    return [...storeResults, ...eventResults, ...STATIC_SUPPLEMENTS];
  }, [stores, events]);

  return { results, loading: storesLoading || eventsLoading };
}
