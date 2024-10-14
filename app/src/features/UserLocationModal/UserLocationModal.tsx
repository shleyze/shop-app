import { useEffect, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { Icon, Modal, useTheme } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useUserStore } from "@/hooks/useUser";

import { UserLocation } from "./UserLocation";
import { useStore } from "./store";

export function UserLocationModal() {
  const insets = useSafeAreaInsets();
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
    <Modal
      visible={isModalOpen}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      animationType="fade"
      style={{ width: "100%", height: "100%" }}
      collapsable={false}
    >
      <UserLocation onStoreSelect={handleModalClose} />
      {canBeClosed && (
        <TouchableOpacity
          style={{
            width: 24,
            height: 24,
            position: "absolute",
            top: insets.top,
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
