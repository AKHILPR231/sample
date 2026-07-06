import { useMemo } from "react";

import type {
  ReferralEntry,
  ReferralStep,
  ShareOption,
} from "@/features/stamps/types";

const STEPS: ReferralStep[] = [
  { number: 1, titleKey: "referralStep1Title", descKey: "referralStep1Desc" },
  { number: 2, titleKey: "referralStep2Title", descKey: "referralStep2Desc" },
  { number: 3, titleKey: "referralStep3Title", descKey: "referralStep3Desc" },
  { number: 4, titleKey: "referralStep4Title", descKey: "referralStep4Desc" },
];

const SHARE_OPTIONS: ShareOption[] = [
  { id: "whatsapp", labelKey: "shareWhatsapp", icon: "logo-whatsapp" },
  { id: "message", labelKey: "shareMessage", icon: "chatbubble-outline" },
  { id: "mail", labelKey: "shareMail", icon: "mail-outline" },
  { id: "copy", labelKey: "shareCopyLink", icon: "copy-outline" },
];

/**
 * STATIC DATA — there is no referrals collection in the schema, so the referral
 * list is defined here.
 */
const REFERRALS: ReferralEntry[] = [
  { id: "ref_michael", name: "Michael Chen", status: "completed", amount: "€ 5.00" },
  { id: "ref_elena", name: "Elena Rodriguez", status: "pending" },
  { id: "ref_james", name: "James Wilson", status: "completed", amount: "€ 5.00" },
];

type UseReferralResult = {
  steps: ReferralStep[];
  shareOptions: ShareOption[];
  referrals: ReferralEntry[];
};

export function useReferral(): UseReferralResult {
  return useMemo<UseReferralResult>(
    () => ({ steps: STEPS, shareOptions: SHARE_OPTIONS, referrals: REFERRALS }),
    [],
  );
}
