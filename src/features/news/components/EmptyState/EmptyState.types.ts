import type { ComponentProps } from "react";

import type { MaterialCommunityIcons } from "@expo/vector-icons";

export type EmptyStateProps = {
  icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
  title: string;
  body?: string;
};
