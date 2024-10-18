import type { City, CityStore, Coordinates } from "@/types";
import type { FormData } from "@/features/Order/types";

export type Store = {
  storeId?: CityStore["id"];
  selectedLocation?: Coordinates;
  isInDeliveryZone: boolean;
  nearestCity?: City;
  nearestStore?: CityStore;
  userOrderInfo?: FormData;
  actions: {
    setStoreId(storeId: CityStore["id"]): void;
    setNearestData: (
      data: Pick<Store, "nearestStore" | "nearestCity" | "isInDeliveryZone">,
    ) => void;
    setSelectedLocation: (location: Coordinates) => void;
    setUserOrderInfo: (info: FormData) => void;
  };
};
