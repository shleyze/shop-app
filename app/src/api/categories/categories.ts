import type { GenericAbortSignal } from "axios";

import { client } from "@/api";

import type {
  GetCategoriesApiRequest,
  GetCategoriesApiResponseSuccess,
  GetCategoriesApiResponseFailure,
} from "./types";

export async function getCategories(
  params?: GetCategoriesApiRequest,
  signal?: GenericAbortSignal,
) {
  return client.get<
    GetCategoriesApiResponseFailure,
    GetCategoriesApiResponseSuccess
  >("categories", {
    signal,
  });
}
