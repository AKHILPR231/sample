import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { OUTLETS, type Outlet } from "./outlets";

type OutletContextValue = {
  outlets: Outlet[];
  selected: Outlet;
  selectOutlet: (id: string) => void;
};

const OutletContext = createContext<OutletContextValue | null>(null);

export function OutletProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string>(OUTLETS[0].id);

  const value = useMemo<OutletContextValue>(() => {
    const selected =
      OUTLETS.find((outlet) => outlet.id === selectedId) ?? OUTLETS[0];
    return {
      outlets: OUTLETS,
      selected,
      selectOutlet: setSelectedId,
    };
  }, [selectedId]);

  return (
    <OutletContext.Provider value={value}>{children}</OutletContext.Provider>
  );
}

export function useOutlet(): OutletContextValue {
  const ctx = useContext(OutletContext);
  if (!ctx) {
    throw new Error("useOutlet must be used within an OutletProvider");
  }
  return ctx;
}
