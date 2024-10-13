import type { UserLocation } from "./types";

export function getHasFullInfo(data: Partial<UserLocation>) {
  return (
    "coordinates" in data &&
    "region" in data &&
    "street" in data &&
    "housenumber" in data
  );
}
