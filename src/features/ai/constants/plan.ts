import type {
  PlanStats,
  PlanStop,
  RecommendedStop,
} from "@/features/ai/types";

/**
 * STATIC DATA — the generated itinerary is not backed by a collection in the
 * schema, so the stops, stats and recommendations are seeded here.
 *
 * To use real brand logos instead of the Ionicons fallback: export the image
 * from `@/assets/images` and set `logo` on the stop, e.g.
 *   import { zaraLogo } from "@/assets/images";
 *   { ..., icon: "bag-outline", logo: zaraLogo }
 */
export const PLAN_STOPS: PlanStop[] = [
  {
    id: "stop_parking_start",
    time: "10:00 AM",
    title: "Parking Level B2",
    subtitle: "Reserved spot near elevator",
    meta: "",
    icon: "car-outline",
    boundary: "start",
  },
  {
    id: "stop_zara",
    time: "10:10 AM",
    title: "Zara",
    subtitle: "20% off today",
    meta: "Level 1 · 45mins",
    icon: "bag-outline",
  },
  {
    id: "stop_apple",
    time: "11:00 AM",
    title: "Apple store",
    subtitle: "New arrivals",
    meta: "Level 2 · 35mins",
    icon: "phone-portrait-outline",
  },
  {
    id: "stop_cafe_blanc",
    time: "11:45 AM",
    title: "Café Blanc",
    subtitle: "Free coffee (Silver tier)",
    meta: "Level 3 · 12mins",
    icon: "cafe-outline",
  },
  {
    id: "stop_hm",
    time: "12:00 PM",
    title: "H&M",
    subtitle: "15% off (Fashion Club)",
    meta: "Level 1 · 45mins",
    icon: "shirt-outline",
  },
  {
    id: "stop_dean_david",
    time: "01:00 PM",
    title: "Dean & David",
    subtitle: "Each dish only 11€",
    meta: "Level 1 · 45mins",
    icon: "restaurant-outline",
  },
  {
    id: "stop_parking_end",
    time: "02:00 PM",
    title: "Parking Level B2",
    subtitle: "Reserved spot near elevator",
    meta: "",
    icon: "car-outline",
    boundary: "end",
  },
];

export const PLAN_STATS: PlanStats = {
  time: "4hrs",
  stops: "8",
  savings: "€15.00",
};

export const RECOMMENDED_STOPS: RecommendedStop[] = [
  {
    id: "rec_nike",
    title: "Nike Store",
    subtitle: "Clearance Sale",
    meta: "Level 2 · 15mins",
    icon: "walk-outline",
  },
  {
    id: "rec_boss",
    title: "Boss Store",
    subtitle: "10% OFF",
    meta: "Level 2 · 7mins",
    icon: "bag-handle-outline",
  },
];

/** Fallback chips for the plan card when the chat summary is empty. */
export const DEFAULT_SUMMARY_CHIPS: string[] = [
  "Family with children (6–12)",
  "Half day",
  "Shopping",
  "Dining",
  "€100–€200",
];

/** Spare time shown on the edit screen. */
export const PLAN_AVAILABLE_MINUTES = "15MINS";
export const PLAN_TOTAL_TIME = "3h 45mins";
