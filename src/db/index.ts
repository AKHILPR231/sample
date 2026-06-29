/**
 * VIA Outlets — RxDB Database Initialiser
 *
 * Usage (call once at app bootstrap, e.g. in App.tsx):
 *
 *   import { initDatabase, getDatabase } from './database';
 *   await initDatabase();
 *   const db = getDatabase(); // typed singleton from anywhere
 *
 * Storage strategy:
 *   - Development / Jest: getRxStorageMemory()  — zero-config, reset each run
 *   - Production (bare RN): getRxStorageSQLite() via react-native-quick-sqlite (JSI)
 *   - Expo: swap for the Expo Filesystem storage (see comment below)
 *
 * Encryption:
 *   Sensitive fields (access_token, refresh_token, gdpr_consent, profile,
 *   qr_payload) are declared `encrypted` in the schemas. The wrapping storage
 *   encrypts them transparently with AES-256 via the crypto-js plugin.
 *   Supply the password from your secure keychain — never hardcode it.
 */

// ── Expo alternative ──────────────────────────────────────────────────────────
// import { getRxStorageExpoSQLite } from 'rxdb-premium/plugins/storage-expo-sqlite';
// ─────────────────────────────────────────────────────────────────────────────
import {
  type AuthSessionDocument,
  authSessionSchema,
  type CustomerDocument,
  customerSchema,
  type EventDocument,
  eventSchema,
  type OutletDocument,
  outletSchema,
  type ParkingSessionDocument,
  parkingSessionSchema,
  type PromotionDocument,
  promotionSchema,
  type ServiceDocument,
  serviceSchema,
  type StoreDocument,
  storeSchema,
  type TransactionDocument,
  transactionSchema,
  type VoucherDocument,
  voucherSchema,
} from "@/schemas";

import sha256 from "crypto-js/sha256";
import {
  addRxPlugin,
  createRxDatabase,
  type RxCollection,
  type RxDatabase,
} from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { wrappedKeyEncryptionCryptoJsStorage } from "rxdb/plugins/encryption-crypto-js";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";
// DEVELOPMENT / TEST
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";

// ─────────────────────────────────────────────
// Database type
// ─────────────────────────────────────────────

export type ViaOutletsCollections = {
  customers: RxCollection<CustomerDocument>;
  auth_sessions: RxCollection<AuthSessionDocument>;
  outlets: RxCollection<OutletDocument>;
  stores: RxCollection<StoreDocument>;
  services: RxCollection<ServiceDocument>;
  transactions: RxCollection<TransactionDocument>;
  vouchers: RxCollection<VoucherDocument>;
  parking_sessions: RxCollection<ParkingSessionDocument>;
  promotions: RxCollection<PromotionDocument>;
  events: RxCollection<EventDocument>;
};

export type ViaOutletsDatabase = RxDatabase<ViaOutletsCollections>;

// ─────────────────────────────────────────────
// Singleton
// ─────────────────────────────────────────────

let _db: ViaOutletsDatabase | null = null;

export function getDatabase(): ViaOutletsDatabase {
  if (!_db)
    throw new Error("Database not initialised. Call initDatabase() first.");
  return _db;
}

// ─────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────

export async function initDatabase(options?: {
  /**
   * AES-256 encryption password — retrieve from the device keychain
   * (e.g. react-native-keychain) and pass here. Never hardcode.
   * Required; the db will throw if any encrypted field is accessed without it.
   */
  password: string;
  /**
   * Set to true to enable the RxDB DevMode plugin (schema validation, helpful
   * warnings). Always false in production builds.
   */
  devMode?: boolean;
  /**
   * Database name on disk. Defaults to 'via_outlets_db'.
   */
  dbName?: string;
}): Promise<ViaOutletsDatabase> {
  if (_db) return _db;

  const {
    password,
    devMode = __DEV__,
    dbName = "via_outlets_db",
  } = options ?? { password: "" };

  if (devMode) {
    addRxPlugin(RxDBDevModePlugin);
  }

  // ── Choose storage ─────────────────────────────────────────────────────────
  const baseStorage = getRxStorageMemory();
  const validatedStorage = wrappedValidateAjvStorage({ storage: baseStorage });
  const storage = wrappedKeyEncryptionCryptoJsStorage({
    storage: validatedStorage,
  });
  // ──────────────────────────────────────────────────────────────────────────

  const db = await createRxDatabase<ViaOutletsCollections>({
    name: dbName,
    storage,
    password,
    multiInstance: false, // required for React Native (single JS thread)
    ignoreDuplicate: true, // safe to call initDatabase() more than once
    hashFunction: async (input: string | Blob | ArrayBuffer) => {
      let dataStr: string;
      if (typeof input === "string") {
        dataStr = input;
      } else if (input instanceof ArrayBuffer) {
        dataStr = new TextDecoder().decode(input);
      } else {
        dataStr = String(input);
      }
      return sha256(dataStr).toString();
    },
  });

  await db.addCollections({
    customers: { schema: customerSchema },
    auth_sessions: { schema: authSessionSchema },
    outlets: { schema: outletSchema },
    stores: { schema: storeSchema },
    services: { schema: serviceSchema },
    transactions: { schema: transactionSchema },
    vouchers: { schema: voucherSchema },
    parking_sessions: { schema: parkingSessionSchema },
    promotions: { schema: promotionSchema },
    events: { schema: eventSchema },
  });

  _db = db as ViaOutletsDatabase;
  return _db;
}

/**
 * Destroys the database and clears the singleton.
 * Use in tests between suites, or on a full sign-out/wipe scenario.
 */
// export async function destroyDatabase(): Promise<void> {
//   if (_db) {
//     await _db.destroy();
//     _db = null;
//   }
// }
