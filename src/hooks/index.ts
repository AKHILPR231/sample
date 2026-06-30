/**
 * VIA Outlets — RxDB React Hooks
 *
 * All hooks return live, reactive data — the component re-renders automatically
 * whenever the underlying RxDB collection changes (insert, update, delete).
 *
 * Pattern: useRxQuery wraps an RxDB query in a useState + useEffect subscription.
 * Every hook is typed against the collection document types defined in schemas.
 *
 * Usage example:
 *
 *   const { data: outlets, loading } = useOutlets();
 *   const { data: customer } = useCustomer('cust_sophie_001');
 *   const { data: vouchers } = useActiveVouchers('cust_elena_003');
 */

import { useEffect, useState } from "react";

import { getDatabase } from "@/db";
import type {
  CustomerDocument,
  EventDocument,
  OutletDocument,
  ParkingSessionDocument,
  PromotionDocument,
  ServiceDocument,
  StoreDocument,
  TransactionDocument,
  VoucherDocument,
} from "@/schemas";

import type { RxDocument, RxQuery } from "rxdb";

// ─────────────────────────────────────────────
// Generic hook factory
// ─────────────────────────────────────────────

type HookResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

/** Subscribes to an RxQuery and exposes reactive result + loading/error state. */
function useRxQuery<T>(
  buildQuery: () => RxQuery<any, RxDocument<T>[] | RxDocument<T> | null> | null,
): HookResult<T[] | T | null> {
  const [data, setData] = useState<T[] | T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let sub: { unsubscribe: () => void } | null = null;
    try {
      const query = buildQuery();
      if (!query) {
        setLoading(false);
        return;
      }

      sub = query.$.subscribe({
        next: (result) => {
          if (Array.isArray(result)) {
            setData(result.map((doc) => doc.toJSON()) as T[]);
          } else {
            setData(
              result
                ? ((result as RxDocument<T>).toJSON() as unknown as T)
                : null,
            );
          }
          setLoading(false);
        },
        error: (err) => {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setLoading(false);
    }

    return () => sub?.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}

// ─────────────────────────────────────────────
// Outlets
// ─────────────────────────────────────────────

/** All outlets, sorted by name. */
export function useOutlets(): HookResult<OutletDocument[]> {
  return useRxQuery<OutletDocument>(() =>
    getDatabase().outlets.find({ sort: [{ name: "asc" }] }),
  ) as HookResult<OutletDocument[]>;
}

/** Single outlet by ID. */
export function useOutlet(outletId: string): HookResult<OutletDocument> {
  return useRxQuery<OutletDocument>(() =>
    getDatabase().outlets.findOne(outletId),
  ) as HookResult<OutletDocument>;
}

/** Outlets filtered by country code (e.g. 'NL', 'DE'). */
export function useOutletsByCountry(
  country: string,
): HookResult<OutletDocument[]> {
  return useRxQuery<OutletDocument>(() =>
    getDatabase().outlets.find({
      selector: { country: { $eq: country } },
      sort: [{ name: "asc" }],
    }),
  ) as HookResult<OutletDocument[]>;
}

// ─────────────────────────────────────────────
// Stores
// ─────────────────────────────────────────────

/** All stores for a given outlet. */
export function useStores(outletId: string): HookResult<StoreDocument[]> {
  return useRxQuery<StoreDocument>(() =>
    getDatabase().stores.find({
      selector: { outlet_id: { $eq: outletId }, status: { $eq: "open" } },
      sort: [{ name: "asc" }],
    }),
  ) as HookResult<StoreDocument[]>;
}

/** Stores for an outlet filtered by category. */
export function useStoresByCategory(
  outletId: string,
  category: string,
): HookResult<StoreDocument[]> {
  return useRxQuery<StoreDocument>(() =>
    getDatabase().stores.find({
      selector: {
        outlet_id: { $eq: outletId },
        category: { $eq: category },
        status: { $eq: "open" },
      },
      sort: [{ name: "asc" }],
    }),
  ) as HookResult<StoreDocument[]>;
}

/** Single store by ID. */
export function useStore(storeId: string): HookResult<StoreDocument> {
  return useRxQuery<StoreDocument>(() =>
    getDatabase().stores.findOne(storeId),
  ) as HookResult<StoreDocument>;
}

// ─────────────────────────────────────────────
// Consumer Services
// ─────────────────────────────────────────────

/** All services for an outlet. */
export function useServices(outletId: string): HookResult<ServiceDocument[]> {
  return useRxQuery<ServiceDocument>(() =>
    getDatabase().services.find({
      selector: { outlet_id: { $eq: outletId } },
      sort: [{ type: "asc" }, { name: "asc" }],
    }),
  ) as HookResult<ServiceDocument[]>;
}

/** Services filtered by type (e.g. 'restroom', 'vip_lounge', 'ev_charging'). */
export function useServicesByType(
  outletId: string,
  type: ServiceDocument["type"],
): HookResult<ServiceDocument[]> {
  return useRxQuery<ServiceDocument>(() =>
    getDatabase().services.find({
      selector: {
        outlet_id: { $eq: outletId },
        type: { $eq: type },
        status: { $eq: "operational" },
      },
    }),
  ) as HookResult<ServiceDocument[]>;
}

/** Single service by ID. */
export function useService(serviceId: string): HookResult<ServiceDocument> {
  return useRxQuery<ServiceDocument>(() =>
    getDatabase().services.findOne(serviceId),
  ) as HookResult<ServiceDocument>;
}

// ─────────────────────────────────────────────
// Customer
// ─────────────────────────────────────────────

/** Single customer profile by ID. */
export function useCustomer(customerId: string): HookResult<CustomerDocument> {
  return useRxQuery<CustomerDocument>(() =>
    getDatabase().customers.findOne(customerId),
  ) as HookResult<CustomerDocument>;
}

/** The current logged-in customer — reads customer_id from your auth store / context. */
export function useCurrentCustomer(
  customerId: string | null,
): HookResult<CustomerDocument> {
  return useRxQuery<CustomerDocument>(() =>
    customerId ? getDatabase().customers.findOne(customerId) : null,
  ) as HookResult<CustomerDocument>;
}

// ─────────────────────────────────────────────
// Transactions
// ─────────────────────────────────────────────

/** Paginated transaction history for a customer, newest first. */
export function useTransactions(
  customerId: string,
  options: { limit?: number; skip?: number } = {},
): HookResult<TransactionDocument[]> {
  const { limit = 20, skip = 0 } = options;
  return useRxQuery<TransactionDocument>(() =>
    getDatabase().transactions.find({
      selector: { customer_id: { $eq: customerId } },
      sort: [{ transaction_date: "desc" }],
      limit,
      skip,
    }),
  ) as HookResult<TransactionDocument[]>;
}

/** Earn transactions only. */
export function useEarnTransactions(
  customerId: string,
): HookResult<TransactionDocument[]> {
  return useRxQuery<TransactionDocument>(() =>
    getDatabase().transactions.find({
      selector: { customer_id: { $eq: customerId }, type: { $eq: "earn" } },
      sort: [{ transaction_date: "desc" }],
    }),
  ) as HookResult<TransactionDocument[]>;
}

// ─────────────────────────────────────────────
// Vouchers
// ─────────────────────────────────────────────

/** All active (redeemable) vouchers for a customer. */
export function useActiveVouchers(
  customerId: string,
): HookResult<VoucherDocument[]> {
  return useRxQuery<VoucherDocument>(() =>
    getDatabase().vouchers.find({
      selector: { customer_id: { $eq: customerId }, status: { $eq: "active" } },
      sort: [{ valid_until: "asc" }], // soonest-expiring first
    }),
  ) as HookResult<VoucherDocument[]>;
}

/** All vouchers for a customer (any status — for history view). */
export function useAllVouchers(
  customerId: string,
): HookResult<VoucherDocument[]> {
  return useRxQuery<VoucherDocument>(() =>
    getDatabase().vouchers.find({
      selector: { customer_id: { $eq: customerId } },
      sort: [{ issued_at: "desc" }],
    }),
  ) as HookResult<VoucherDocument[]>;
}

// ─────────────────────────────────────────────
// Parking
// ─────────────────────────────────────────────

/** Active parking session for a customer (if any). */
export function useActiveParkingSession(
  customerId: string,
): HookResult<ParkingSessionDocument> {
  return useRxQuery<ParkingSessionDocument>(() =>
    getDatabase().parking_sessions.findOne({
      selector: { customer_id: { $eq: customerId }, status: { $eq: "active" } },
    }),
  ) as HookResult<ParkingSessionDocument>;
}

/** All parking sessions for a customer, most recent first. */
export function useParkingHistory(
  customerId: string,
): HookResult<ParkingSessionDocument[]> {
  return useRxQuery<ParkingSessionDocument>(() =>
    getDatabase().parking_sessions.find({
      selector: { customer_id: { $eq: customerId } },
      sort: [{ started_at: "desc" }],
    }),
  ) as HookResult<ParkingSessionDocument[]>;
}

// ─────────────────────────────────────────────
// Promotions
// ─────────────────────────────────────────────

/** Currently active promotions applicable to a locale. */
export function useActivePromotions(
  locale: string,
): HookResult<PromotionDocument[]> {
  const now = new Date().toISOString();
  return useRxQuery<PromotionDocument>(() =>
    getDatabase().promotions.find({
      selector: {
        status: { $eq: "active" },
        locale: { $eq: locale },
        valid_from: { $lte: now },
        valid_until: { $gte: now },
      },
      sort: [{ valid_until: "asc" }],
    }),
  ) as HookResult<PromotionDocument[]>;
}

/** Promotions applicable to a specific outlet. */
export function useOutletPromotions(
  outletId: string,
): HookResult<PromotionDocument[]> {
  const now = new Date().toISOString();
  return useRxQuery<PromotionDocument>(() =>
    getDatabase().promotions.find({
      selector: {
        status: { $eq: "active" },
        applicable_outlets: { $elemMatch: { $eq: outletId } },
        valid_from: { $lte: now },
        valid_until: { $gte: now },
      },
    }),
  ) as HookResult<PromotionDocument[]>;
}

// ─────────────────────────────────────────────
// Events
// ─────────────────────────────────────────────

/** Upcoming events, sorted by start date. Optionally filter by outlet. */
export function useUpcomingEvents(
  outletId?: string,
): HookResult<EventDocument[]> {
  const now = new Date().toISOString();
  return useRxQuery<EventDocument>(() =>
    getDatabase().events.find({
      selector: {
        start_datetime: { $gte: now },
        ...(outletId ? { venue_outlet_id: { $eq: outletId } } : {}),
      },
      sort: [{ start_datetime: "asc" }],
    }),
  ) as HookResult<EventDocument[]>;
}

/** Events accessible to a given loyalty tier (e.g. Platinum pre-sale). */
export function useTierEvents(
  tier: CustomerDocument["loyalty"]["tier"],
): HookResult<EventDocument[]> {
  const now = new Date().toISOString();
  return useRxQuery<EventDocument>(() =>
    getDatabase().events.find({
      selector: {
        start_datetime: { $gte: now },
        $or: [
          { target_audience: { $elemMatch: { $eq: "all" } } },
          { target_audience: { $elemMatch: { $eq: tier } } },
        ],
      },
      sort: [{ start_datetime: "asc" }],
    }),
  ) as HookResult<EventDocument[]>;
}

// ─────────────────────────────────────────────
// Imperative helpers (mutations)
// ─────────────────────────────────────────────

/**
 * Upserts a customer document (use after a successful Coniq API response
 * to keep the local cache in sync).
 */
export async function upsertCustomer(data: CustomerDocument): Promise<void> {
  await getDatabase().customers.upsert(data);
}

/**
 * Marks a voucher as redeemed locally (optimistic update — confirm via API).
 */
export async function redeemVoucherLocally(
  voucherId: string,
  outletId: string,
  storeId?: string,
): Promise<void> {
  const doc = await getDatabase().vouchers.findOne(voucherId).exec();
  if (!doc) throw new Error(`Voucher ${voucherId} not found`);
  await doc.patch({
    status: "redeemed",
    redeemed_at: new Date().toISOString(),
    redeemed_at_outlet_id: outletId,
    redeemed_at_store_id: storeId,
  });
}

/**
 * Saves a new parking session locally when started via the Parkable API.
 */
export async function saveNewParkingSession(
  data: ParkingSessionDocument,
): Promise<void> {
  await getDatabase().parking_sessions.upsert(data);
}

/**
 * Marks a parking session as completed and records the final charge.
 */
export async function completeParkingSession(
  sessionId: string,
  endedAt: string,
  amountCharged: number,
  durationMinutes: number,
): Promise<void> {
  const doc = await getDatabase().parking_sessions.findOne(sessionId).exec();
  if (!doc) throw new Error(`Session ${sessionId} not found`);
  await doc.patch({
    status: "completed",
    ended_at: endedAt,
    amount_charged_eur: amountCharged,
    duration_minutes: durationMinutes,
  });
}

// ─────────────────────────────────────────────
// News (events surfaced as articles)
// ─────────────────────────────────────────────

/**
 * All events presented as news articles, newest first.
 * The News feature treats each EventDocument as an article — no separate
 * collection or schema is introduced.
 */
export function useNewsArticles(): HookResult<EventDocument[]> {
  return useRxQuery<EventDocument>(() =>
    getDatabase().events.find({
      sort: [{ start_datetime: "desc" }],
    }),
  ) as HookResult<EventDocument[]>;
}

/** Single news article (event) by its uid. */
export function useNewsArticle(uid: string): HookResult<EventDocument> {
  return useRxQuery<EventDocument>(() =>
    getDatabase().events.findOne(uid),
  ) as HookResult<EventDocument>;
}

/**
 * Related articles: other events sharing the same category (`type`),
 * excluding the current one, newest first.
 */
export function useRelatedNews(
  uid: string,
  type: string,
): HookResult<EventDocument[]> {
  return useRxQuery<EventDocument>(() =>
    getDatabase().events.find({
      selector: {
        type: { $eq: type },
        uid: { $ne: uid },
      },
      sort: [{ start_datetime: "desc" }],
      limit: 4,
    }),
  ) as HookResult<EventDocument[]>;
}
