import type { Ionicons } from "@expo/vector-icons";

export type StampFilterId = "food" | "drinks" | "menAccessories" | "womenApparel";

export type StampFilter = {
  id: StampFilterId;
  labelKey: string;
};

export type StampCard = {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  collected: number;
  total: number;
  validUntil?: string;
  category: StampFilterId;
};

export type ReferralStep = {
  number: number;
  titleKey: string;
  descKey: string;
};

export type ReferralStatus = "completed" | "pending";

export type ReferralEntry = {
  id: string;
  name: string;
  status: ReferralStatus;
  amount?: string;
};

export type ShareOption = {
  id: string;
  labelKey: string;
  icon: keyof typeof Ionicons.glyphMap;
};
