import { useEffect, useMemo, useState } from "react";

import { getDatabase } from "@/db";
import type {
  TransactionFilter,
  TransactionSection,
  TransactionView,
} from "@/features/history/types";
import { CURRENT_CUSTOMER_ID } from "@/features/profile/hooks/useProfileData";
import type { TransactionDocument } from "@/schemas";

import { useTranslation } from "react-i18next";

type TranslateFn = ReturnType<typeof useTranslation>["t"];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatEur = (value: number): string => `€${value.toFixed(2)}`;

const dateLabelFor = (iso: string, t: TranslateFn): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const now = new Date();
  if (date.toDateString() === now.toDateString()) return t("historyToday");
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
};

const mapTransaction = (
  tx: TransactionDocument,
  t: TranslateFn,
): TransactionView => {
  const credit = tx.type === "earn";
  return {
    id: tx.transaction_id,
    title: tx.store_name ?? tx.outlet_name ?? tx.sub_type,
    subtitle: t("transactionPurchase", {
      item: tx.store_name ?? tx.sub_type,
    }),
    amountLabel: credit
      ? `+${tx.points} ${t("pointsSuffix")}`
      : `-${formatEur(tx.redeemed_value_eur ?? 0)}`,
    credit,
    icon: credit ? "bag-handle-outline" : "cash-outline",
  };
};

/**
 * STATIC FALLBACK — used when the transactions collection is empty. Item names
 * behave like content; the "Purchase:" prefix is localized.
 */
const staticSections = (t: TranslateFn): TransactionSection[] => [
  {
    dateLabel: t("historyToday"),
    data: [
      {
        id: "s_morning_1",
        title: "Morning Brew",
        subtitle: t("transactionPurchase", { item: "Espresso" }),
        amountLabel: "€0.05",
        credit: true,
        icon: "cafe-outline",
      },
      {
        id: "s_tommy",
        title: "Tommy Hilfiger",
        subtitle: t("transactionPurchase", { item: "Dress" }),
        amountLabel: "€1.20",
        credit: true,
        icon: "bag-handle-outline",
      },
    ],
  },
  {
    dateLabel: "Jun 12, 2026",
    data: [
      {
        id: "s_dean",
        title: "Dean & David",
        subtitle: t("transactionPurchase", { item: "warm bowls, wraps" }),
        amountLabel: "€0.05",
        credit: true,
        icon: "restaurant-outline",
      },
      {
        id: "s_calvin",
        title: "Calvin Klein",
        subtitle: t("transactionPurchase", { item: "Underwear Thong" }),
        amountLabel: "€0.08",
        credit: true,
        icon: "bag-handle-outline",
      },
      {
        id: "s_cash",
        title: "Cash Redeemed",
        subtitle: t("transactionPurchase", { item: "Calvin Klein" }),
        amountLabel: "-€5.50",
        credit: false,
        icon: "cash-outline",
      },
      {
        id: "s_morning_2",
        title: "Morning Brew",
        subtitle: t("transactionPurchase", { item: "Espresso" }),
        amountLabel: "€1.20",
        credit: true,
        icon: "cafe-outline",
      },
    ],
  },
  {
    dateLabel: "Jun 3, 2026",
    data: [
      {
        id: "s_zadig",
        title: "Zadig & Voltaire",
        subtitle: t("transactionPurchase", { item: "T-Shirt" }),
        amountLabel: "€0.09",
        credit: true,
        icon: "bag-handle-outline",
      },
    ],
  },
];

type UseTransactionHistoryResult = {
  sections: TransactionSection[];
  filter: TransactionFilter;
  setFilter: (filter: TransactionFilter) => void;
};

export function useTransactionHistory(): UseTransactionHistoryResult {
  const { t } = useTranslation();
  const [txns, setTxns] = useState<TransactionDocument[]>([]);
  const [filter, setFilter] = useState<TransactionFilter>("all");

  useEffect(() => {
    let sub: { unsubscribe: () => void } | null = null;
    try {
      sub = getDatabase()
        .transactions.find({
          selector: { customer_id: { $eq: CURRENT_CUSTOMER_ID } },
        })
        .$.subscribe({
          next: (docs) =>
            setTxns(docs.map((doc) => doc.toJSON() as TransactionDocument)),
          error: () => setTxns([]),
        });
    } catch {
      setTxns([]);
    }
    return () => sub?.unsubscribe();
  }, []);

  const allSections = useMemo<TransactionSection[]>(() => {
    if (txns.length === 0) return staticSections(t);

    const sorted = [...txns].sort((a, b) =>
      b.transaction_date.localeCompare(a.transaction_date),
    );

    const sections: TransactionSection[] = [];
    for (const tx of sorted) {
      const label = dateLabelFor(tx.transaction_date, t);
      const view = mapTransaction(tx, t);
      const last = sections[sections.length - 1];
      if (last && last.dateLabel === label) {
        last.data.push(view);
      } else {
        sections.push({ dateLabel: label, data: [view] });
      }
    }
    return sections;
  }, [txns, t]);

  const sections = useMemo<TransactionSection[]>(() => {
    if (filter === "all") return allSections;
    const wantCredit = filter === "earned";
    return allSections
      .map((section) => ({
        dateLabel: section.dateLabel,
        data: section.data.filter((item) => item.credit === wantCredit),
      }))
      .filter((section) => section.data.length > 0);
  }, [allSections, filter]);

  return { sections, filter, setFilter };
}
