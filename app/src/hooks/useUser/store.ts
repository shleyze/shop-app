import { createPersistStore } from "@/store";

import type { Store } from "./types";

export const useStore = createPersistStore<
  Store,
  Pick<Store, "storeId" | "selectedLocation">
>(
  "useUser",
  (setState) => {
    return {
      storeId: undefined,
      selectedLocation: undefined,
      nearestCity: undefined,
      nearestStore: undefined,
      isInDeliveryZone: false,
      actions: {
        setStoreId(storeId) {
          setState({ storeId }, false, "setStoreId");
        },
        setSelectedLocation(selectedLocation) {
          setState({ selectedLocation }, false, "setSelectedLocation");
        },

        setNearestData(nearestData) {
          setState(nearestData, false, "setNearestData");
        },
      },
    };
  },
  {
    partialize(state) {
      return {
        storeId: state.storeId,
        selectedLocation: state.selectedLocation,
      };
    },
  },
);
