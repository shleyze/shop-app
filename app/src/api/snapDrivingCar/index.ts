import { openRouteClient } from "@/api";

import type {
  GetSnapDrivingCarApiGetParams,
  GetSnapDrivingCarApiGetSuccess,
} from "./types";

export async function getSnapDrivingCar({
  radius = 350,
  ...rest
}: GetSnapDrivingCarApiGetParams) {
  return openRouteClient.post<GetSnapDrivingCarApiGetSuccess>(
    "/v2/snap/driving-car/geojson",
    { ...rest, radius },
  );
}
