import type { Ionicons } from "@expo/vector-icons";

export type TransactionFilter = "all" | "earned" | "redeemed";

export type TransactionView = {
  id: string;
  title: string;
  subtitle: string;
  amountLabel: string;
  /** true = earned (positive), false = redeemed (negative). */
  credit: boolean;
  icon: keyof typeof Ionicons.glyphMap;
};

export type TransactionSection = {
  dateLabel: string;
  data: TransactionView[];
};
