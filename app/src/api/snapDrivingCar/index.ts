import { openRouteClient } from "@/api";

import type {
  GetSnapDrivingCarApiGetParams,
  GetSnapDrivingCarApiGetSuccess,
} from "./types";

export async function getSnapDrivingCar({
  radius = 350,
  ...rest
}: GetSnapDrivingCarApiGetParams) {
  console.log("req", { ...rest, radius });
  return openRouteClient.post<GetSnapDrivingCarApiGetSuccess>(
    "/v2/snap/driving-car/geojson",
    { ...rest, radius },
  );
}
