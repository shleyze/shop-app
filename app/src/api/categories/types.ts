import type { AdminResponseSuccess, Category } from "@/types";

export type GetCategoriesApiRequest = {};
export type GetCategoriesApiResponseSuccess = AdminResponseSuccess<Category>;
export type GetCategoriesApiResponseFailure = {};
