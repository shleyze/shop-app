import { useEffect, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { Icon, Modal, useTheme } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// import { UserLocation } from "./UserLocation";
import { useStore } from "./store";
import { OrderContent } from "./OrderСontent";
export function OrderModal() {
  // const insets = useSafeAreaInsets();
  // const theme = useTheme();

  const isModalOpen = useStore((state) => state.isModalOpen);
  const handleModalClose = useStore((state) => state.actions.setModalClose);

  return (
    <Modal
      visible={isModalOpen}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      animationType="fade"
      style={{ width: "100%", height: "100%" }}
      collapsable={false}
      onBackdropPress={handleModalClose}
    >
      <OrderContent />
    </Modal>
  );
}
