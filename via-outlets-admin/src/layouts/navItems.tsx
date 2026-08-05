import type { ReactNode } from "react";

import { GearIcon, ListIcon, StoreIcon } from "@/components/icons";

export type NavItem = {
  id: string;
  label: string;
  to: string;
  icon: ReactNode;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "outlet", label: "Outlet Config", to: "/admin", icon: <GearIcon /> },
  { id: "services", label: "Services", to: "/admin/services", icon: <ListIcon /> },
  { id: "brands", label: "Brands", to: "/admin/brands", icon: <StoreIcon /> },
];
