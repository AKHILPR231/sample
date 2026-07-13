import { create } from "zustand";

import {
  PLAN_STATS,
  PLAN_STOPS,
  RECOMMENDED_STOPS,
} from "@/features/ai/constants/plan";
import type {
  PlanStats,
  PlanStop,
  RecommendedStop,
} from "@/features/ai/types";

type ItineraryState = {
  /** Answer labels collected in the chat, shown as chips on the plan card. */
  summaryChips: string[];
  stops: PlanStop[];
  recommended: RecommendedStop[];
  stats: PlanStats;
  setSummaryChips: (chips: string[]) => void;
  toggleDone: (id: string) => void;
  removeStop: (id: string) => void;
  addRecommended: (id: string) => void;
  reset: () => void;
};

export const useItineraryStore = create<ItineraryState>((set) => ({
  summaryChips: [],
  stops: PLAN_STOPS,
  recommended: RECOMMENDED_STOPS,
  stats: PLAN_STATS,

  setSummaryChips: (chips: string[]) => set({ summaryChips: chips }),

  toggleDone: (id: string) =>
    set((state) => ({
      stops: state.stops.map((stop) =>
        stop.id === id ? { ...stop, done: !stop.done } : stop,
      ),
    })),

  removeStop: (id: string) =>
    set((state) => ({
      stops: state.stops.filter((stop) => stop.id !== id),
    })),

  addRecommended: (id: string) =>
    set((state) => {
      const pick = state.recommended.find((item) => item.id === id);
      if (!pick) return state;

      const stop: PlanStop = {
        id: pick.id,
        time: "—",
        title: pick.title,
        subtitle: pick.subtitle,
        meta: pick.meta,
        icon: pick.icon,
        logo: pick.logo,
      };

      // Insert before the closing stop so the plan still ends at the car park.
      const lastIndex = state.stops.length - 1;
      const next = [...state.stops];
      next.splice(Math.max(lastIndex, 0), 0, stop);

      return {
        stops: next,
        recommended: state.recommended.filter((item) => item.id !== id),
      };
    }),

  reset: () =>
    set({
      summaryChips: [],
      stops: PLAN_STOPS,
      recommended: RECOMMENDED_STOPS,
      stats: PLAN_STATS,
    }),
}));
