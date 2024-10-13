import type { AdminResponseSuccess, CityStore } from "@/types";

export type GetStoresApiRequest = {};
export type GetStoresApiResponseSuccess = AdminResponseSuccess<CityStore>;
export type GetStoresApiResponseFailure = {};
