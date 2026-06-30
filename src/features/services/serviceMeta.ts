/**
 * Presentation metadata for services.
 *
 * Maps the database `service.type` and `service.features[]` values to display
 * labels and `@expo/vector-icons` glyphs. This is view-layer configuration
 * (icon + copy), deliberately decoupled from the RxDB schema so no schema
 * change is needed to render icons the design calls for.
 */
import type { ComponentProps } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

type MdiName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export type ServiceMeta = {
  /** Friendly label shown when the service name is too specific for a tile. */
  label: string;
  icon: MdiName;
};

/** type → tile label + icon. */
const SERVICE_META: Record<string, ServiceMeta> = {
  restroom: { label: "Restrooms", icon: "human-male-female" },
  rest_area: { label: "Rest Areas", icon: "sofa-outline" },
  vip_lounge: { label: "VIP Lounge", icon: "sofa-single-outline" },
  kids_area: { label: "Kids Area", icon: "teddy-bear" },
  visitor_centre: { label: "Info Desk", icon: "information-outline" },
  tax_refund: { label: "Tax Refund", icon: "cash-refund" },
  ev_charging: { label: "EV Charging", icon: "ev-station" },
  currency_exchange: { label: "Currency Exchange", icon: "currency-eur" },
  parking: { label: "Parking", icon: "parking" },
  wifi: { label: "Free WiFi", icon: "wifi" },
  atm: { label: "ATM", icon: "credit-card-outline" },
  locker: { label: "Lockers", icon: "locker" },
};

const FALLBACK_META: ServiceMeta = { label: "Service", icon: "map-marker-outline" };

export function getServiceMeta(type: string): ServiceMeta {
  return SERVICE_META[type] ?? { ...FALLBACK_META, label: humanise(type) };
}

/** feature flag → label + icon, for the detail screen and facilities card. */
const FEATURE_META: Record<string, ServiceMeta> = {
  baby_changing: { label: "Baby changing", icon: "baby-bottle-outline" },
  family_room: { label: "Family room", icon: "human-male-female-child" },
  accessible: { label: "Wheelchair accessible", icon: "wheelchair-accessibility" },
  wifi: { label: "Free WiFi", icon: "wifi" },
  refreshments: { label: "Refreshments", icon: "coffee-outline" },
  concierge_desk: { label: "Concierge desk", icon: "bell-outline" },
  luggage_storage: { label: "Luggage storage", icon: "bag-suitcase-outline" },
  cloakroom: { label: "Cloakroom", icon: "hanger" },
  personal_shopper: { label: "Personal shopper", icon: "shopping-outline" },
  soft_play: { label: "Soft play", icon: "shape-outline" },
  supervised_weekends: { label: "Supervised weekends", icon: "account-supervisor-outline" },
  outdoor: { label: "Outdoor seating", icon: "tree-outline" },
  covered: { label: "Covered seating", icon: "umbrella-outline" },
  Type2: { label: "Type 2 connector", icon: "ev-plug-type2" },
  CCS: { label: "CCS connector", icon: "ev-plug-ccs2" },
};

export function getFeatureMeta(feature: string): ServiceMeta {
  return FEATURE_META[feature] ?? { label: humanise(feature), icon: "check-circle-outline" };
}

/** "ev_charging" → "Ev charging" (used only as a safe fallback label). */
function humanise(value: string): string {
  const spaced = value.replace(/[_-]+/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
