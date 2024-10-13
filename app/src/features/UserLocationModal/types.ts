import type { PropsWithChildren } from "react";
import type { Coordinates, CityStore } from "@/types";

export type UserLocation = {
  region?: string;
  street?: string;
  housenumber?: string;
  coordinates?: {
    longitude: number;
    latitude: number;
  };
  hasFullInfo: boolean;
};

type State = {
  isModalOpen: boolean;
};

type Actions = {
  setModalOpen: () => void;
  setModalClose: () => void;
};

export type Store = State & { actions: Actions };

export type CustomStoreSelectProps = {
  onStoreSelect?: (storeId: CityStore["id"]) => void;
};

export type MapStoreSelectProps = PropsWithChildren<{
  location: Coordinates;
  stores?: CityStore[];
  onLocationSelect?: (location: Coordinates) => void;
  onError?: () => void;
}>;

export type UserLocationProps = {
  onStoreSelect?: () => void;
};
