import { createStore } from "@/store";

import type { Store } from "./types";

export const useStore = createStore<Store>(
  "useOrderModal",
  (setState, getState, store) => {
    return {
      isModalOpen: false,
      actions: {
        setModalOpen() {
          setState({ isModalOpen: true }, false, "setModalOpen");
        },
        setModalClose() {
          setState({ isModalOpen: false }, false, "setModalClose");
        },
      },
    };
  },
);
