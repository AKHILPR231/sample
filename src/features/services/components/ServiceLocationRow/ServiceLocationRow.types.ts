import type { ServiceDocument } from "@/schemas";

export type ServiceLocationRowProps = {
  service: ServiceDocument;
  /** Marks the row representing the service currently being viewed. */
  active?: boolean;
  onPress?: (service: ServiceDocument) => void;
  last?: boolean;
};
