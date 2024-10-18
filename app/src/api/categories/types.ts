import type { AdminResponseSuccessList, Category } from "@/types";

export type GetCategoriesApiRequest = {};
export type GetCategoriesApiResponseSuccess =
  AdminResponseSuccessList<Category>;
export type GetCategoriesApiResponseFailure = {};
