import { City, CityStore, Coordinates } from "@/types";

export type Store = {
  storeId?: CityStore["id"];
  selectedLocation?: Coordinates;
  isInDeliveryZone: boolean;
  nearestCity?: City;
  nearestStore?: CityStore;
  actions: {
    setStoreId(storeId: CityStore["id"]): void;
    setNearestData: (
      data: Pick<Store, "nearestStore" | "nearestCity" | "isInDeliveryZone">,
    ) => void;
    setSelectedLocation: (location: Coordinates) => void;
  };
};
