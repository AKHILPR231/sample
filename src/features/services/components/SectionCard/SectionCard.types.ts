import type { ComponentProps, ReactNode } from "react";

import type { MaterialCommunityIcons } from "@expo/vector-icons";

export type SectionCardProps = {
  title: string;
  /** Optional leading icon next to the title. */
  icon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
  children: ReactNode;
};
