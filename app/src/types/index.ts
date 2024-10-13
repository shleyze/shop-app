export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Location = {
  name: string;
  address?: string;
  coordinates: Coordinates;
};

export type City = {
  name: string;
  coordinates: Coordinates;
  stores: CityStore[];
  id: number;
};

export type CityStore = {
  name: string;
  address: string;
  coordinates: Coordinates;
  deliveryZone: StoreDeliveryZone;
  id: number;
};

export type StoreDeliveryZone = {
  polygon: Coordinates[];
};
