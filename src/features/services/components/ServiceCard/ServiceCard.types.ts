import type { ServiceGroup } from "../../types";

export type ServiceCardProps = {
  group: ServiceGroup;
  onPress: (group: ServiceGroup) => void;
};
