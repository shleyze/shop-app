import type { GenericAbortSignal } from "axios";

import { client } from "@/api";

import type {
  GetStoresApiRequest,
  GetStoresApiResponseFailure,
  GetStoresApiResponseSuccess,
} from "./types";

export async function getStores(
  data: GetStoresApiRequest,
  signal?: GenericAbortSignal,
) {
  return client.get<GetStoresApiResponseFailure, GetStoresApiResponseSuccess>(
    "stores",
    { signal },
  );
}
