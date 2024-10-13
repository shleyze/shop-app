import { userLogin, userLogout } from "@/api/user";
import { createPersistStore } from "@/store";

import type { Store } from "./types";

export const useAuth = createPersistStore<
  Store,
  Omit<Store, "actions" | "isLoading" | "hasError">
>(
  "auth",
  (setState, getState, store) => {
    return {
      isLoading: false,
      hasError: false,
      isLoggedIn: false,
      actions: {
        async login(data: Parameters<typeof userLogin>[0]) {
          try {
            setState(
              { isLoading: true, hasError: false },
              false,
              "login:start",
            );
            const { exp, user } = await userLogin(data);

            setState(
              { exp, name: user.name, email: user.email, isLoading: false },
              false,
              "login:success",
            );
          } catch (error) {
            setState(
              { isLoading: false, hasError: true },
              false,
              "login:success",
            );
            return Promise.reject(error);
          }
        },
        async logout() {
          try {
            setState({ isLoading: true }, false, "logout:start");
            await userLogout();
          } catch (error) {
            return Promise.reject(error);
          }

          const initialState = store.getInitialState();

          setState(initialState, true, "logout:success");
        },
        setError(hasError) {
          setState({ hasError }, false, "setError");
        },
      },
    };
  },
  {
    partialize(state) {
      return {
        email: state.email,
        name: state.name,
        exp: state.exp,
        isLoggedIn: state.isLoggedIn,
      };
    },
  },
);
