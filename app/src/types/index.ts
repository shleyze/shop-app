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
  id: string;
};

export type CityStore = {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  city: City;
  deliveryZone: {
    polygon: Coordinates[];
  };
  createdAt: "2024-10-13T11:52:55.206Z";
  updatedAt: "2024-10-13T11:52:55.206Z";
};

export type GroupedStores = {
  [cityId: string]: {
    city: City;
    stores: CityStore[];
  };
};

export type AdminResponseSuccess<T> = {
  docs: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
};
