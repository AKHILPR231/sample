/**
 * Pure, side-effect-free helpers for the Services feature.
 * Kept separate so they can be memoised in components and unit-tested.
 */
import type { OutletDocument, ServiceDocument } from "@/schemas";

import { getServiceMeta } from "./serviceMeta";
import type { HoursRange, ServiceGroup } from "./types";

/**
 * Collapses a flat list of services into one category group per `type`,
 * preserving first-seen order. Each group carries a count and a subtitle.
 */
export function groupServicesByType(services: ServiceDocument[]): ServiceGroup[] {
  const order: string[] = [];
  const buckets = new Map<string, ServiceDocument[]>();

  for (const svc of services) {
    const bucket = buckets.get(svc.type);
    if (bucket) {
      bucket.push(svc);
    } else {
      buckets.set(svc.type, [svc]);
      order.push(svc.type);
    }
  }

  return order.map((type) => {
    const items = buckets.get(type)!;
    const representative = items[0];
    const { label } = getServiceMeta(type);
    const count = items.length;
    const subtitle =
      count > 1 ? `${count} locations` : representative.location_description;

    return { type, label, count, representative, subtitle };
  });
}

/**
 * Aggregates the distinct `features` across all services into a de-duplicated,
 * ordered list — used to populate the Facilities & Amenities card from real
 * data rather than static copy.
 */
export function aggregateFeatures(services: ServiceDocument[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const svc of services) {
    for (const feature of svc.features ?? []) {
      if (!seen.has(feature)) {
        seen.add(feature);
        result.push(feature);
      }
    }
  }

  return result;
}

const DAY_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const DAY_LABEL: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

/**
 * Formats an outlet's weekly opening hours into compact ranges, merging
 * consecutive days that share the same hours (e.g. "Mon – Fri  10:00 – 18:00").
 */
export function formatOpeningHours(
  hours: OutletDocument["opening_hours"] | undefined,
): HoursRange[] {
  if (!hours) return [];

  const ranges: HoursRange[] = [];
  let startIdx: number | null = null;
  let current = "";

  const hoursFor = (day: string): string => {
    const entry = hours[day];
    if (!entry) return "Closed";
    return `${entry.open} – ${entry.close}`;
  };

  const flush = (endIdx: number) => {
    if (startIdx === null) return;
    const startDay = DAY_LABEL[DAY_ORDER[startIdx]];
    const endDay = DAY_LABEL[DAY_ORDER[endIdx]];
    const label = startIdx === endIdx ? startDay : `${startDay} – ${endDay}`;
    ranges.push({ label, value: current });
  };

  DAY_ORDER.forEach((day, idx) => {
    const value = hoursFor(day);
    if (startIdx === null) {
      startIdx = idx;
      current = value;
    } else if (value !== current) {
      flush(idx - 1);
      startIdx = idx;
      current = value;
    }
  });

  if (startIdx !== null) flush(DAY_ORDER.length - 1);
  return ranges;
}
