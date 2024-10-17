import {
  useState,
  type ReactElement,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { TouchableOpacity } from "react-native";
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
  Divider,
} from "@ui-kitten/components";
import { useRouter, usePathname } from "expo-router";

import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useUserStore } from "@/hooks/useUser";
import { openUserLocationModal } from "@/features/UserLocationModal";
import { useStoresQuery } from "@/hooks/useStores";

const UserIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="person-outline" />
);

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const email = useAuth((store) => store.email);

  const [modalVisible, setModalVisible] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const storesQuery = useStoresQuery();

  const storeId = useUserStore((state) => state.storeId);

  const selectedStore = useMemo(() => {
    return storesQuery.data?.docs.find((store) => store.id === storeId);
  }, [storesQuery.data, storeId]);

  const renderLeftActions = useCallback((): ReactElement => {
    if (!canGoBack) {
      return <></>;
    }

    return (
      <>
        <TopNavigationAction
          icon={(props) => <Icon {...props} name="arrow-ios-back-outline" />}
          onPress={() => {
            router.back();
          }}
          disabled={!canGoBack}
        />
      </>
    );
  }, [canGoBack, router.canGoBack, router.navigate]);

  const renderRightActions = (): ReactElement => (
    <>
      <TopNavigationAction icon={UserIcon} onPress={openModal} />
    </>
  );

  useEffect(() => {
    setCanGoBack(router.canGoBack());
  }, [pathname, router.canGoBack]);

  return (
    <Layout style={{ paddingBottom: 8 }}>
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
        accessoryLeft={renderLeftActions}
        // accessoryRight={renderRightActions}
      />
      <Divider />

      <Modal
        visible={modalVisible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onBackdropPress={closeModal}
        animationType="fade"
      >
        <Card disabled={true} style={{ width: 320 }}>
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
