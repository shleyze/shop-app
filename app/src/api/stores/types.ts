import type { AdminResponseSuccessList, CityStore } from "@/types";

export type GetStoresApiRequest = {};
export type GetStoresApiResponseSuccess = AdminResponseSuccessList<CityStore>;
export type GetStoresApiResponseFailure = {};
