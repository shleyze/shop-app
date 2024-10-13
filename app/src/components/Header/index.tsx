import { useState, type ReactElement, useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Icon,
  type IconElement,
  type IconProps,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Modal,
  Card,
  Text,
} from "@ui-kitten/components";

import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useAvailableCitiesAndStores } from "@/hooks/useAvailableCitiesAndStores";
import { useUserStore } from "@/hooks/useUser";
import { openUserLocationModal } from "@/features/UserLocationModal";

const UserIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="person-outline" />
);

export function Header() {
  const email = useAuth((store) => store.email);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const { stores } = useAvailableCitiesAndStores();
  const storeId = useUserStore((state) => state.storeId);

  const selectedStore = useMemo(() => {
    return stores.find((store) => store.id === storeId);
  }, [stores, storeId]);

  const renderRightActions = (): ReactElement => (
    <>
      <TopNavigationAction icon={UserIcon} onPress={openModal} />
    </>
  );

  return (
    <Layout level="1">
      <TopNavigation
        alignment="center"
        title={
          <TouchableOpacity onPress={openUserLocationModal}>
            <Text category="s1" style={{ textAlign: "center" }}>
              {selectedStore?.name || "Выберите ближайший магазин"}
            </Text>
            <Text
              category="s2"
              appearance="hint"
              style={{ textAlign: "center" }}
            >
              {selectedStore?.address || "Товары зависят от адреса"}
            </Text>
          </TouchableOpacity>
        }
        accessoryRight={renderRightActions}
      />

      <Modal
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={closeModal}
        animationType="fade"
      >
        <Card disabled={true} style={styles.card}>
          {email ? (
            <Text>Инфа о пользователе</Text>
          ) : (
            <LoginForm afterSuccessSubmit={closeModal} />
          )}
        </Card>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    width: 320,
  },
});
