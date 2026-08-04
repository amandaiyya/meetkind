import { RankedVenue } from "@/types/venue";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PlanStore = {
    venues: RankedVenue[];
    hasHydrated: boolean;

    setVenues: (venues: RankedVenue[]) => void;
    setHasHydrated: (hydrate: boolean) => void;
};

export const usePlanStore = create<PlanStore>()(
    persist(
        (set) => ({
            venues: [],
            hasHydrated: false,
            setVenues: (venues) => set({ venues }),
            setHasHydrated: (hydrate) => set({ hasHydrated: hydrate }),
        }),
        {
            name: "meetkind-plan-store",
            storage: createJSONStorage(() => sessionStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);