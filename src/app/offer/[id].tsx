import { useLocalSearchParams } from "expo-router";

import { OfferDetailScreen } from "@/features/offers/OfferDetailScreen";

export default function OfferDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <OfferDetailScreen offerId={id ?? ""} />;
}
