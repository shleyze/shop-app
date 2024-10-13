import { useStore } from "./store";

export function openUserLocationModal() {
  useStore.getState().actions.setModalOpen();
}
