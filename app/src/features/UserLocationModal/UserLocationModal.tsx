import { useEffect, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { Icon, useTheme } from "@ui-kitten/components";

import { useUserStore } from "@/hooks/useUser";
import { Modal } from "@/components/Modal";

import { UserLocation } from "./UserLocation";
import { useStore } from "./store";

export function UserLocationModal() {
  const theme = useTheme();

  const isModalOpen = useStore((state) => state.isModalOpen);
  const handleModalOpen = useStore((state) => state.actions.setModalOpen);
  const handleModalClose = useStore((state) => state.actions.setModalClose);
  const storeId = useUserStore((state) => state.storeId);

  const canBeClosed = useMemo(() => !!storeId, [storeId]);

  useEffect(() => {
    if (!storeId) {
      handleModalOpen();
    }
  }, [handleModalOpen, storeId]);

  return (
    <Modal visible={isModalOpen}>
      <UserLocation onStoreSelect={handleModalClose} />
      {canBeClosed && (
        <TouchableOpacity
          style={{
            width: 24,
            height: 24,
            position: "absolute",
            top: 0,
            right: 20,
          }}
          onPress={handleModalClose}
        >
          <Icon name="close-square-outline" fill={theme["color-primary-600"]} />
        </TouchableOpacity>
      )}
    </Modal>
  );
}
