import type { GenericAbortSignal } from "axios";

import { client } from "@/api";

import type {
  UserLoginApiRequest,
  UserLoginApiResponseFailure,
  UserLoginApiResponseSuccess,
  UserLogoutApiRequestFailure,
  UserLogoutApiRequestSuccess,
} from "./types";

export async function userLogin(
  data: UserLoginApiRequest,
  signal?: GenericAbortSignal,
) {
  return client.post<UserLoginApiResponseFailure, UserLoginApiResponseSuccess>(
    "users/login",
    data,
    { signal },
  );
}
export async function userLogout(signal?: GenericAbortSignal) {
  return client.post<UserLogoutApiRequestFailure, UserLogoutApiRequestSuccess>(
    "users/logout",
    {},
    { signal },
  );
}

export * from "./types";
