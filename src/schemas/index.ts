import type { RxJsonSchema } from "rxdb";

// ─────────────────────────────────────────────
// Customer / Auth
// ─────────────────────────────────────────────

export type CustomerDocument = {
  customer_id: string;
  external_id: string;
  program_id: string;
  status: "active" | "suspended" | "inactive";
  created_at: string;
  last_activity: string;
  profile: {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    date_of_birth?: string;
    gender?: string;
    nationality: string;
    country_of_residence: string;
    preferred_language: string;
    preferred_outlet_id: string;
    avatar_url?: string;
  };
  address?: {
    line1?: string;
    city: string;
    postcode?: string;
    country: string;
  };
  gdpr_consent: {
    marketing_email: boolean;
    marketing_sms: boolean;
    marketing_push: boolean;
    profiling_analytics: boolean;
    third_party_sharing: boolean;
    data_processing_basis: string;
    accepted_at: string;
    last_updated?: string;
    consent_version: string;
  };
  loyalty: {
    card_number: string;
    digital_card_url?: string;
    tier: "member" | "silver" | "gold" | "platinum";
    tier_achieved_date?: string;
    tier_review_date?: string;
    points_balance: number;
    lifetime_points: number;
    pending_points: number;
    expiring_points?: { amount: number; expiry_date: string | null };
    next_tier?: string;
    spend_to_next_tier_eur?: number | null;
    tier_progress_pct: number;
    tier_spend_ytd_eur: number;
    tier_spend_threshold_eur: number;
  };
  spending_summary: {
    total_spend_ytd_eur: number;
    total_spend_lifetime_eur: number;
    visit_count_ytd: number;
    avg_basket_eur: number;
    last_visit_date?: string | null;
    last_visit_outlet_id?: string | null;
    favourite_category?: string | null;
  };
  linked_accounts: {
    apple_wallet: boolean;
    google_wallet: boolean;
    social_login?: { provider: string; linked_at: string } | null;
  };
  platinum_benefits?: {
    personal_shopper: boolean;
    vip_lounge_access: boolean;
    free_valet: boolean;
    exclusive_preview_events: boolean;
  };
};

export const customerSchema: RxJsonSchema<CustomerDocument> = {
  title: "customer",
  version: 0,
  type: "object",
  primaryKey: "customer_id",
  properties: {
    customer_id: { type: "string", maxLength: 64 },
    external_id: { type: "string" },
    program_id: { type: "string" },
    status: { type: "string", enum: ["active", "suspended", "inactive"] },
    created_at: { type: "string" },
    last_activity: { type: "string" },
    profile: {
      type: "object",
      properties: {
        first_name: { type: "string", maxLength: 128 },
        last_name: { type: "string", maxLength: 128 },
        email: { type: "string", maxLength: 256 },
        mobile: { type: "string", maxLength: 32 },
        date_of_birth: { type: "string" },
        gender: { type: "string", maxLength: 32 },
        nationality: { type: "string", maxLength: 64 },
        country_of_residence: { type: "string", maxLength: 64 },
        preferred_language: { type: "string", maxLength: 16 },
        preferred_outlet_id: { type: "string", maxLength: 64 },
        avatar_url: { type: "string" },
      },
      required: [
        "first_name",
        "last_name",
        "email",
        "mobile",
        "nationality",
        "country_of_residence",
        "preferred_language",
        "preferred_outlet_id",
      ],
    },
    address: {
      type: "object",
      properties: {
        line1: { type: "string", maxLength: 256 },
        city: { type: "string", maxLength: 128 },
        postcode: { type: "string", maxLength: 32 },
        country: { type: "string", maxLength: 64 },
      },
    },
    gdpr_consent: {
      type: "object",
      properties: {
        marketing_email: { type: "boolean" },
        marketing_sms: { type: "boolean" },
        marketing_push: { type: "boolean" },
        profiling_analytics: { type: "boolean" },
        third_party_sharing: { type: "boolean" },
        data_processing_basis: { type: "string", maxLength: 64 },
        accepted_at: { type: "string" },
        last_updated: { type: "string" },
        consent_version: { type: "string", maxLength: 32 },
      },
      required: [
        "marketing_email",
        "marketing_sms",
        "marketing_push",
        "profiling_analytics",
        "third_party_sharing",
        "data_processing_basis",
        "accepted_at",
        "consent_version",
      ],
    },
    loyalty: {
      type: "object",
      properties: {
        card_number: { type: "string", maxLength: 128 },
        digital_card_url: { type: "string" },
        tier: {
          type: "string",
          enum: ["member", "silver", "gold", "platinum"],
          maxLength: 32,
        },
        tier_achieved_date: { type: "string" },
        tier_review_date: { type: "string" },
        points_balance: { type: "number" },
        lifetime_points: { type: "number" },
        pending_points: { type: "number" },
        expiring_points: { type: "object" },
        next_tier: { type: "string", maxLength: 64 },
        spend_to_next_tier_eur: { type: "number" },
        tier_progress_pct: { type: "number" },
        tier_spend_ytd_eur: { type: "number" },
        tier_spend_threshold_eur: { type: "number" },
      },
      required: [
        "card_number",
        "tier",
        "points_balance",
        "lifetime_points",
        "pending_points",
        "tier_progress_pct",
        "tier_spend_ytd_eur",
        "tier_spend_threshold_eur",
      ],
    },
    spending_summary: {
      type: "object",
      properties: {
        total_spend_ytd_eur: { type: "number" },
        total_spend_lifetime_eur: { type: "number" },
        visit_count_ytd: { type: "number" },
        avg_basket_eur: { type: "number" },
        last_visit_date: { type: "string" },
        last_visit_outlet_id: { type: "string", maxLength: 64 },
        favourite_category: { type: "string", maxLength: 128 },
      },
    },
    linked_accounts: {
      type: "object",
      properties: {
        apple_wallet: { type: "boolean" },
        google_wallet: { type: "boolean" },
        social_login: { type: "object" },
      },
    },
    platinum_benefits: {
      type: "object",
      properties: {
        personal_shopper: { type: "boolean" },
        vip_lounge_access: { type: "boolean" },
        free_valet: { type: "boolean" },
        exclusive_preview_events: { type: "boolean" },
      },
    },
  },
  required: [
    "customer_id",
    "external_id",
    "program_id",
    "status",
    "profile",
    "loyalty",
  ],
  indexes: ["loyalty.tier", "profile.preferred_outlet_id"],
  encrypted: ["gdpr_consent", "linked_accounts"],
};

// ─────────────────────────────────────────────
// Auth session
// ─────────────────────────────────────────────

export type AuthSessionDocument = {
  session_id: string;
  customer_id: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_at: string;
  scope: string;
  program_id: string;
};

export const authSessionSchema: RxJsonSchema<AuthSessionDocument> = {
  title: "auth_session",
  version: 0,
  type: "object",
  primaryKey: "session_id",
  properties: {
    session_id: { type: "string", maxLength: 128 },
    customer_id: { type: "string", maxLength: 64 }, // FIXED: Added maxLength because it is indexed
    access_token: { type: "string" },
    refresh_token: { type: "string" },
    token_type: { type: "string" },
    expires_at: { type: "string" },
    scope: { type: "string" },
    program_id: { type: "string" },
  },
  required: [
    "session_id",
    "customer_id",
    "access_token",
    "refresh_token",
    "expires_at",
  ],
  indexes: ["customer_id"],
  encrypted: ["access_token", "refresh_token"],
};

// ─────────────────────────────────────────────
// Outlets
// ─────────────────────────────────────────────

export type OutletDocument = {
  outlet_id: string;
  slug: string;
  name: string;
  operator_brand: string;
  status: "open" | "closed" | "temporarily_closed";
  type: string;
  country: string;
  currency: string;
  hero_image_url: string;
  thumbnail_url: string;
  location: {
    address: string;
    city: string;
    postcode?: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  opening_hours: Record<string, { open: string; close: string; note?: string }>;
  stats: {
    total_stores: number;
    total_gla_sqm: number;
    parking_capacity: number;
    annual_visitors: number;
  };
  features: string[];
  transport?: Record<string, string>;
  loyalty_earn_rate: string;
  loyalty_multiplier: number;
  current_offers_count: number;
  regional_note?: string;
};

export const outletSchema: RxJsonSchema<OutletDocument> = {
  title: "outlet",
  version: 0,
  type: "object",
  primaryKey: "outlet_id",
  properties: {
    outlet_id: { type: "string", maxLength: 32 },
    slug: { type: "string" },
    name: { type: "string" },
    operator_brand: { type: "string" },
    status: {
      type: "string",
      enum: ["open", "closed", "temporarily_closed"],
      maxLength: 32,
    }, // FIXED: Added maxLength because it is indexed
    type: { type: "string" },
    country: { type: "string", maxLength: 2 },
    currency: { type: "string", maxLength: 3 },
    hero_image_url: { type: "string" },
    thumbnail_url: { type: "string" },
    location: { type: "object" },
    contact: { type: "object" },
    opening_hours: { type: "object" },
    stats: { type: "object" },
    features: { type: "array", items: { type: "string" } },
    transport: { type: "object" },
    loyalty_earn_rate: { type: "string" },
    loyalty_multiplier: { type: "number" },
    current_offers_count: { type: "number" },
    regional_note: { type: "string" },
  },
  required: ["outlet_id", "slug", "name", "status", "country", "location"],
  indexes: ["country", "status"],
};

// ─────────────────────────────────────────────
// Stores
// ─────────────────────────────────────────────

export type StoreDocument = {
  store_id: string;
  outlet_id: string;
  brand_id: string;
  name: string;
  category: string;
  sub_category?: string;
  logo_url?: string;
  hero_image_url?: string;
  unit_number: string;
  location_description: string;
  status: "open" | "closed" | "temporarily_closed";
  discount_range?: string;
  accepts_loyalty: boolean;
  loyalty_multiplier: number;
  tags?: string[];
  rating?: number;
  review_count?: number;
};

export const storeSchema: RxJsonSchema<StoreDocument> = {
  title: "store",
  version: 0,
  type: "object",
  primaryKey: "store_id",
  properties: {
    store_id: { type: "string", maxLength: 64 },
    outlet_id: { type: "string", maxLength: 32 },
    brand_id: { type: "string" },
    name: { type: "string" },
    category: { type: "string", maxLength: 64 }, // FIXED: Added maxLength because it is indexed
    sub_category: { type: "string" },
    logo_url: { type: "string" },
    hero_image_url: { type: "string" },
    unit_number: { type: "string" },
    location_description: { type: "string" },
    status: {
      type: "string",
      enum: ["open", "closed", "temporarily_closed"],
      maxLength: 32,
    }, // FIXED: Added maxLength because it is indexed
    discount_range: { type: "string" },
    accepts_loyalty: { type: "boolean" },
    loyalty_multiplier: { type: "number" },
    tags: { type: "array", items: { type: "string" } },
    rating: { type: "number" },
    review_count: { type: "number" },
  },
  required: ["store_id", "outlet_id", "brand_id", "name", "category", "status"],
  indexes: ["outlet_id", "category", "status", ["outlet_id", "category"]],
};

// ─────────────────────────────────────────────
// Consumer Services
// ─────────────────────────────────────────────

export type ServiceDocument = {
  service_id: string;
  outlet_id: string;
  type: string;
  name: string;
  location_description: string;
  features?: string[];
  status: "operational" | "under_maintenance" | "closed";
  access_required?: string;
  opening_hours?: { open: string; close: string };
  metadata?: Record<string, unknown>;
};

export const serviceSchema: RxJsonSchema<ServiceDocument> = {
  title: "service",
  version: 0,
  type: "object",
  primaryKey: "service_id",
  properties: {
    service_id: { type: "string", maxLength: 64 },
    outlet_id: { type: "string", maxLength: 32 },
    type: { type: "string", maxLength: 64 }, // FIXED: Added maxLength because it is indexed
    name: { type: "string" },
    location_description: { type: "string" },
    features: { type: "array", items: { type: "string" } },
    status: {
      type: "string",
      enum: ["operational", "under_maintenance", "closed"],
      maxLength: 32,
    }, // FIXED: Added maxLength because it is indexed
    access_required: { type: "string" },
    opening_hours: { type: "object" },
    metadata: { type: "object" },
  },
  required: ["service_id", "outlet_id", "type", "name", "status"],
  indexes: ["outlet_id", "type", "status", ["outlet_id", "type"]],
};

// ─────────────────────────────────────────────
// Loyalty Transactions
// ─────────────────────────────────────────────

export type TransactionDocument = {
  transaction_id: string;
  customer_id: string;
  type: "earn" | "burn";
  sub_type: string;
  points: number;
  spend_amount?: number;
  redeemed_value_eur?: number;
  currency?: string;
  earn_rate?: string;
  outlet_id?: string;
  outlet_name?: string;
  store_id?: string;
  store_name?: string;
  receipt_number?: string;
  transaction_date: string;
  status: "confirmed" | "pending" | "reversed";
  campaign_id?: string;
  campaign_name?: string;
  bonus_points?: number;
  multi_outlet_visit?: boolean;
};

export const transactionSchema: RxJsonSchema<TransactionDocument> = {
  title: "transaction",
  version: 0,
  type: "object",
  primaryKey: "transaction_id",
  properties: {
    transaction_id: { type: "string", maxLength: 64 },
    customer_id: { type: "string", maxLength: 64 },
    type: { type: "string", enum: ["earn", "burn"], maxLength: 10 }, // FIXED: Added maxLength because it is indexed
    sub_type: { type: "string" },
    points: { type: "number" },
    spend_amount: { type: "number" },
    redeemed_value_eur: { type: "number" },
    currency: { type: "string", maxLength: 3 },
    earn_rate: { type: "string" },
    outlet_id: { type: "string" },
    outlet_name: { type: "string" },
    store_id: { type: "string" },
    store_name: { type: "string" },
    receipt_number: { type: "string" },
    transaction_date: { type: "string", maxLength: 32 }, // FIXED: Added maxLength because it is indexed
    status: { type: "string", enum: ["confirmed", "pending", "reversed"] },
    campaign_id: { type: "string" },
    campaign_name: { type: "string" },
    bonus_points: { type: "number" },
    multi_outlet_visit: { type: "boolean" },
  },
  required: [
    "transaction_id",
    "customer_id",
    "type",
    "sub_type",
    "points",
    "transaction_date",
    "status",
  ],
  indexes: [
    "customer_id",
    "transaction_date",
    "type",
    ["customer_id", "transaction_date"],
  ],
};

// ─────────────────────────────────────────────
// Vouchers
// ─────────────────────────────────────────────

export type VoucherDocument = {
  voucher_id: string;
  customer_id: string;
  code: string;
  title: string;
  description?: string;
  type: "percentage_discount" | "fixed_amount" | "access_pass" | "free_gift";
  discount_pct?: number;
  discount_value?: number;
  currency?: string;
  applicable_category?: string;
  applicable_stores?: string[];
  applicable_outlets?: string[];
  issued_at: string;
  valid_from?: string;
  valid_until?: string;
  status: "active" | "pending" | "redeemed" | "expired";
  tier_exclusive?: string;
  qr_payload?: string;
  barcode_type?: string;
  usage_limit?: string;
  usage_count?: number;
  redeemed_at?: string;
  redeemed_at_outlet_id?: string;
  redeemed_at_store_id?: string;
};

export const voucherSchema: RxJsonSchema<VoucherDocument> = {
  title: "voucher",
  version: 0,
  type: "object",
  primaryKey: "voucher_id",
  properties: {
    voucher_id: { type: "string", maxLength: 64 },
    customer_id: { type: "string", maxLength: 64 },
    code: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    type: { type: "string" },
    discount_pct: { type: "number" },
    discount_value: { type: "number" },
    currency: { type: "string", maxLength: 3 },
    applicable_category: { type: "string" },
    applicable_stores: { type: "array", items: { type: "string" } },
    applicable_outlets: { type: "array", items: { type: "string" } },
    issued_at: { type: "string" },
    valid_from: { type: "string" },
    valid_until: { type: "string" },
    status: {
      type: "string",
      enum: ["active", "pending", "redeemed", "expired"],
      maxLength: 20,
    }, // FIXED: Added maxLength because it is indexed
    tier_exclusive: { type: "string" },
    qr_payload: { type: "string" },
    barcode_type: { type: "string" },
    usage_limit: { type: "string" },
    usage_count: { type: "number" },
    redeemed_at: { type: "string" },
    redeemed_at_outlet_id: { type: "string" },
    redeemed_at_store_id: { type: "string" },
  },
  required: [
    "voucher_id",
    "customer_id",
    "code",
    "title",
    "type",
    "status",
    "issued_at",
  ],
  indexes: ["customer_id", "status", ["customer_id", "status"]],
  encrypted: ["qr_payload"],
};

// ─────────────────────────────────────────────
// Parking Sessions
// ─────────────────────────────────────────────

export type ParkingSessionDocument = {
  session_id: string;
  customer_id: string;
  venue_id: string;
  zone_id: string;
  bay_number?: string;
  license_plate?: string;
  started_at: string;
  ended_at?: string;
  parking_policy: "free_all_day" | "paid_hourly" | "paid_with_free_period";
  free_until?: string;
  time_remaining_free_minutes?: number;
  duration_minutes?: number;
  amount_due_eur?: number;
  amount_charged_eur?: number;
  payment_method?: string;
  payment_status?: string;
  loyalty_points_earned?: number;
  status: "active" | "completed" | "cancelled";
  ticket_token?: string;
  qr_code_url?: string;
};

export const parkingSessionSchema: RxJsonSchema<ParkingSessionDocument> = {
  title: "parking_session",
  version: 0,
  type: "object",
  primaryKey: "session_id",
  properties: {
    session_id: { type: "string", maxLength: 64 },
    customer_id: { type: "string", maxLength: 64 },
    venue_id: { type: "string" },
    zone_id: { type: "string" },
    bay_number: { type: "string" },
    license_plate: { type: "string" },
    started_at: { type: "string" },
    ended_at: { type: "string" },
    parking_policy: { type: "string" },
    free_until: { type: "string" },
    time_remaining_free_minutes: { type: "number" },
    duration_minutes: { type: "number" },
    amount_due_eur: { type: "number" },
    amount_charged_eur: { type: "number" },
    payment_method: { type: "string" },
    payment_status: { type: "string" },
    loyalty_points_earned: { type: "number" },
    status: {
      type: "string",
      enum: ["active", "completed", "cancelled"],
      maxLength: 20,
    }, // FIXED: Added maxLength because it is indexed
    ticket_token: { type: "string" },
    qr_code_url: { type: "string" },
  },
  required: [
    "session_id",
    "customer_id",
    "venue_id",
    "zone_id",
    "started_at",
    "parking_policy",
    "status",
  ],
  indexes: ["customer_id", "status", ["customer_id", "status"]],
};

// ─────────────────────────────────────────────
// CMS Promotions
// ─────────────────────────────────────────────

export type PromotionDocument = {
  uid: string;
  slug: string;
  locale: string;
  title: string;
  status: "active" | "scheduled" | "expired";
  type: "network_wide" | "outlet_specific" | "tier_exclusive";
  headline: string;
  sub_headline?: string;
  body_copy?: string;
  terms_and_conditions?: string;
  hero_image_url: string;
  gallery?: { url: string; alt_text?: string }[];
  valid_from: string;
  valid_until: string;
  applicable_outlets: string[];
  applicable_categories?: string[];
  coniq_campaign_id?: string;
  loyalty_bonus_points?: number;
  available_locales?: string[];
  cta?: { label: string; action_type: string; action_value: string };
};

export const promotionSchema: RxJsonSchema<PromotionDocument> = {
  title: "promotion",
  version: 0,
  type: "object",
  primaryKey: "uid",
  properties: {
    uid: { type: "string", maxLength: 64 },
    slug: { type: "string" },
    locale: { type: "string", maxLength: 8 },
    title: { type: "string" },
    status: {
      type: "string",
      enum: ["active", "scheduled", "expired"],
      maxLength: 20,
    }, // FIXED: Added maxLength because it is indexed
    type: { type: "string" },
    headline: { type: "string" },
    sub_headline: { type: "string" },
    body_copy: { type: "string" },
    terms_and_conditions: { type: "string" },
    hero_image_url: { type: "string" },
    gallery: { type: "array", items: { type: "object" } },
    valid_from: { type: "string" },
    valid_until: { type: "string", maxLength: 32 }, // FIXED: Added maxLength because it is indexed
    applicable_outlets: { type: "array", items: { type: "string" } },
    applicable_categories: { type: "array", items: { type: "string" } },
    coniq_campaign_id: { type: "string" },
    loyalty_bonus_points: { type: "number" },
    available_locales: { type: "array", items: { type: "string" } },
    cta: { type: "object" },
  },
  required: [
    "uid",
    "slug",
    "locale",
    "title",
    "status",
    "headline",
    "valid_from",
    "valid_until",
  ],
  indexes: ["status", "locale", "valid_until"],
};

// ─────────────────────────────────────────────
// Events
// ─────────────────────────────────────────────

export type EventDocument = {
  uid: string;
  slug: string;
  title: string;
  type: string;
  venue_outlet_id: string;
  venue_outlet_name: string;
  location_in_outlet?: string;
  start_datetime: string;
  end_datetime?: string;
  image_url?: string;
  short_description?: string;
  is_free: boolean;
  ticket_price_eur?: number;
  registration_required: boolean;
  registration_url?: string;
  capacity?: number;
  spots_remaining?: number;
  target_audience?: string[];
};

export const eventSchema: RxJsonSchema<EventDocument> = {
  title: "event",
  version: 0,
  type: "object",
  primaryKey: "uid",
  properties: {
    uid: { type: "string", maxLength: 64 },
    slug: { type: "string" },
    title: { type: "string" },
    type: { type: "string" },
    venue_outlet_id: { type: "string", maxLength: 32 },
    venue_outlet_name: { type: "string" },
    location_in_outlet: { type: "string" },
    start_datetime: { type: "string", maxLength: 32 }, // FIXED: Added maxLength because it is indexed
    end_datetime: { type: "string" },
    image_url: { type: "string" },
    short_description: { type: "string" },
    is_free: { type: "boolean" },
    ticket_price_eur: { type: "number" },
    registration_required: { type: "boolean" },
    registration_url: { type: "string" },
    capacity: { type: "number" },
    spots_remaining: { type: "number" },
    target_audience: { type: "array", items: { type: "string" } },
  },
  required: [
    "uid",
    "slug",
    "title",
    "venue_outlet_id",
    "start_datetime",
    "is_free",
    "registration_required",
  ],
  indexes: ["venue_outlet_id", "start_datetime", "is_free"],
};
