import { createWithEqualityFn as create } from "zustand/traditional";
import { type StateCreator } from "zustand";
import {
  devtools,
  persist,
  createJSONStorage,
  type PersistOptions,
} from "zustand/middleware";
import { shallow } from "zustand/shallow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import deepmerge from "deepmerge";

export function createStore<T extends unknown>(
  name: string,
  initializer: StateCreator<T, [["zustand/devtools", never]], []>,
) {
  return create<T>()(devtools(initializer, { name }), shallow);
}

export function createPersistStore<T extends unknown, P = T>(
  name: string,
  initializer: StateCreator<
    T,
    [["zustand/devtools", never]],
    [["zustand/persist", never]]
  >,
  persistOptions: Omit<PersistOptions<T, P>, "name" | "storage" | "merge"> = {},
) {
  return create<T>()(
    devtools(
      persist(initializer, {
        name,
        storage: createJSONStorage(() => AsyncStorage),
        merge: (persistedState, currentState) =>
          deepmerge<typeof currentState>(currentState, persistedState || {}),

        ...persistOptions,
      }),
      { name },
    ),
    shallow,
  );
}
