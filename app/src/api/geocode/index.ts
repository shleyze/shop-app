import { openRouteClient } from "@/api";

import type {
  GetGeocodeReverseApiGetParams,
  GetGeocodeReverseApiGetSuccess,
} from "./types";

export async function getGeocodeReverse({
  latitude,
  longitude,
  size = 1,
}: GetGeocodeReverseApiGetParams) {
  return openRouteClient.get<GetGeocodeReverseApiGetSuccess>(
    "/geocode/reverse",
    {
      params: {
        "point.lon": longitude,
        "point.lat": latitude,
        size: size,
      },
    },
  );
}
