import { openRouteClient } from "@/api";

import type {
  GetDirectionsDrivingCarApiGetParams,
  GetDirectionsDrivingCarApiGetSuccess,
} from "./types";

export async function getDirectionsDrivingCar(
  params: GetDirectionsDrivingCarApiGetParams,
) {
  return openRouteClient.get<GetDirectionsDrivingCarApiGetSuccess>(
    "/v2/directions/driving-car",
    { params },
  );
}
