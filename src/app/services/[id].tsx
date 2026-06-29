import { useLocalSearchParams } from "expo-router";

import { ServiceDetailScreen } from "@/features/services/ServiceDetailScreen";

export default function ServiceDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ServiceDetailScreen serviceId={id} />;
}
