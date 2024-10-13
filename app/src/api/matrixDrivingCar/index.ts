import { openRouteClient } from "@/api";

import type {
  GetMatrixDrivingCarApiPostSuccess,
  GetMatrixDrivingCarApiPostParams,
} from "./types";

export async function getMatrixDrivingCar(
  params: GetMatrixDrivingCarApiPostParams,
) {
  return openRouteClient.post<GetMatrixDrivingCarApiPostSuccess>(
    "/v2/matrix/driving-car",
    params,
  );
}
