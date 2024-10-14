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

/**
 * Создает Zustand store с поддержкой devtools.
 *
 * @template T Тип состояния store.
 * @param {string} name Имя store для devtools.
 * @param {StateCreator<T, [["zustand/devtools", never]], []>} initializer Функция инициализации состояния store.
 * @returns {StateCreator<T>} Созданный Zustand store.
 *
 * @example
 * const useCounterStore = createStore('counter', (set) => ({
 *   count: 0,
 *   increment: () => set((state) => ({ count: state.count + 1 })),
 * }));
 */
export function createStore<T extends unknown>(
  name: string,
  initializer: StateCreator<T, [["zustand/devtools", never]], []>,
) {
  return create<T>()(devtools(initializer, { name }), shallow);
}

/**
 * Создает персистентный Zustand store с поддержкой devtools.
 *
 * @template T Тип полного состояния store.
 * @template P Тип персистентной части состояния (по умолчанию равен T).
 * @param {string} name Имя store для devtools и персистентного хранилища.
 * @param {StateCreator<T, [["zustand/devtools", never]], [["zustand/persist", never]]>} initializer Функция инициализации состояния store.
 * @param {Omit<PersistOptions<T, P>, "name" | "storage" | "merge">} persistOptions Дополнительные опции для персистентного хранилища.
 * @returns {StateCreator<T>} Созданный персистентный Zustand store.
 *
 * @example
 * const useSettingsStore = createPersistStore('settings', (set) => ({
 *   theme: 'light',
 *   setTheme: (theme) => set({ theme }),
 * }));
 */
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
