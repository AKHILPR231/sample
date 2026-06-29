/**
 * Services feature — static configuration & copy.
 *
 * Only values that genuinely do not belong in the database live here:
 * page titles, the active-outlet selection, and marketing copy that is not
 * modelled in the RxDB schema (e.g. parking tariff wording). All real data
 * (services, parking capacity, opening hours) is read live from RxDB.
 */

/**
 * The outlet the Services screen is scoped to. Batavia Stad Fashion Outlet.
 * Swap this for a value from your app/auth store once outlet selection exists
 * (e.g. `useAppStore`/`useCurrentCustomer().profile.preferred_outlet_id`).
 */
export const ACTIVE_OUTLET_ID = "mall_002";

/** Static page chrome — not database content. */
export const SCREEN_COPY = {
  title: "Services & Info",
  subtitle: "Everything you need for a comfortable visit",
  emptyTitle: "No services listed",
  emptyBody: "Services for this outlet aren't available right now. Please check back soon.",
  errorTitle: "Couldn't load services",
  errorBody: "Something went wrong while loading. Pull to refresh or try again later.",
} as const;

/**
 * Parking tariff copy. This is marketing/operational wording that is not part
 * of the outlet schema, so it is kept static here. The headline capacity figure
 * is read live from `outlet.stats.parking_capacity`.
 */
export const PARKING_COPY = {
  title: "Parking Information",
  lines: [
    "Free parking for the first 2 hours",
    "€1.50/hour thereafter (max €7.50/day)",
    "Reserved spaces for disabled visitors",
  ],
} as const;

export const FACILITIES_TITLE = "Facilities & Amenities";
export const HOURS_TITLE = "Opening Hours";
