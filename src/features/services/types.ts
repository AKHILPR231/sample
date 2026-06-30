import type { ServiceDocument } from "@/schemas";

/**
 * A group of services sharing the same `type`, surfaced as a single category
 * tile in the grid. `count` powers the "N locations" subtitle, and
 * `representative` is the service opened when the tile is tapped.
 */
export type ServiceGroup = {
  type: string;
  label: string;
  count: number;
  representative: ServiceDocument;
  /** Short line shown under the title (location for singletons, count otherwise). */
  subtitle: string;
};

/** A formatted opening-hours range covering one or more consecutive days. */
export type HoursRange = {
  label: string;
  value: string;
};
