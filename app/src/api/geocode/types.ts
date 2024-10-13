export type GetGeocodeReverseApiGetParams = {
  longitude: number;
  latitude: number;
  size?: 1;
};

export type GetGeocodeReverseApiGetSuccess = FeatureCollectionType;

type FeatureCollectionType = {
  type: "FeatureCollection";
  features: FeatureType[];
  bbox: [number, number, number, number];
};

type FeatureType = {
  type: "Feature";
  geometry: GeometryPoint;
  properties: {
    id: string;
    name: string;
    housenumber: string;
    street: string;
    postalcode: string;
    country: string;
    country_a: string;
    region: string;
    region_a: string;
    county: string;
    continent: string;
    label: string;
  };
};

type GeometryPoint = {
  type: "Point";
  coordinates: [number, number];
};
