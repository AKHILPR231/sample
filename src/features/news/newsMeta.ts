/**
 * Presentation metadata for news categories.
 *
 * Maps the database `event.type` value to a display label and an
 * `@expo/vector-icons` glyph. View-layer only — no schema dependency.
 */
import type { ComponentProps } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

type MdiName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export type CategoryMeta = {
  label: string;
  icon: MdiName;
};

const CATEGORY_META: Record<string, CategoryMeta> = {
  members_event: { label: "Members Event", icon: "star-circle-outline" },
  family_event: { label: "Family Event", icon: "balloon" },
  cultural_event: { label: "Cultural Event", icon: "drama-masks" },
  sale_event: { label: "Sale", icon: "sale" },
  fashion_event: { label: "Fashion", icon: "hanger" },
  workshop: { label: "Workshop", icon: "hammer-wrench" },
  seasonal_event: { label: "Seasonal", icon: "weather-sunny" },
};

const FALLBACK: CategoryMeta = { label: "Event", icon: "calendar-star" };

export function getCategoryMeta(type: string | undefined): CategoryMeta {
  if (!type) return FALLBACK;
  return CATEGORY_META[type] ?? { ...FALLBACK, label: humanise(type) };
}

/** "members_event" → "Members Event" (safe fallback label). */
function humanise(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
