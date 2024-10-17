import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, View } from "react-native";
import {
  Button,
  Layout,
  Divider,
  Icon,
  Tab,
  TabView,
  type TabViewProps,
  Text,
} from "@ui-kitten/components";

import type { Coordinates, CityStore } from "@/types";
import { findNearestLocations } from "@/utils/findNearestLocationAndShop";
import { useUserStore } from "@/hooks/useUser";
import { useStoresQuery } from "@/hooks/useStores";
import { groupStoresByCity } from "@/utils/groupStoresByCity";
import { Loader } from "@/components/Loader";
import { useCart } from "@/hooks/useCart";

import { DEFAULT_LOCATION } from "./constants";
import { CustomStoreSelect } from "./CustomStoreSelect";
import { MapStoreSelect } from "./MapStoreSelect";
import type { UserLocationProps } from "./types";

export function UserLocation(props: UserLocationProps) {
  const [state, setState] = useState<{
    isLoading: boolean;
    hasError: boolean;
    selectedTabIndex: number;
  }>({
    isLoading: false,
    hasError: false,
    selectedTabIndex: 0,
  });

  const storesQuery = useStoresQuery();
  const groups = useMemo(
    () => Object.values(groupStoresByCity(storesQuery.data?.docs)),
    [storesQuery.data?.docs],
  );

  const selectedLocation = useUserStore((state) => state.selectedLocation);
  const nearestStore = useUserStore((state) => state.nearestStore);
  const isInDeliveryZone = useUserStore((state) => state.isInDeliveryZone);
  const storeId = useUserStore((state) => state.storeId);
  const handleSetStoreId = useUserStore((state) => state.actions.setStoreId);
  const handleSetNearestData = useUserStore(
    (state) => state.actions.setNearestData,
  );
  const handleSetSelectedLocation = useUserStore(
    (state) => state.actions.setSelectedLocation,
  );

  const isCartEmpty = useCart((state) => state.isCartEmpty);
  const handleResetCart = useCart((state) => state.actions.resetCart);

  const handleStoreSelect = useCallback(
    (selectedStoreId: CityStore["id"]) => {
      handleSetStoreId(selectedStoreId);
      const selectedStore = storesQuery.data?.docs.find(
        ({ id }) => storeId === id,
      );

      function select() {
        if (selectedStore) {
          handleSetSelectedLocation(selectedStore.coordinates);
        }

        props.onStoreSelect?.();
      }

      if (isCartEmpty || storeId === selectedStoreId) {
        select();
      }

      if (!isCartEmpty && storeId !== selectedStoreId) {
        Alert.alert(
          "Внимание!",
          "При смене магазина, все товары в корзине будут утеряны.",
          [
            {
              text: "Сменить магазин",
              onPress: () => {
                select();
                handleResetCart();
              },
            },
            {
              text: "Отмена",
            },
          ],
        );
      }
    },
    [
      handleSetStoreId,
      props.onStoreSelect,
      storesQuery.data,
      isCartEmpty,
      handleResetCart,
      storeId,
    ],
  );

  const handleTabChange: Exclude<TabViewProps["onSelect"], undefined> =
    useCallback((selectedTabIndex) => {
      setState((prevState) => ({
        ...prevState,
        selectedTabIndex,
      }));
    }, []);

  const handleMapError = useCallback(() => {
    if (!storeId) {
      Alert.alert(
        "Произошла ошибка.",
        "Не смогли определить ваш адрес. Выберите ближайший к вам магазин.",
        [
          {
            text: "Выбрать вручную",
            onPress: () => {
              handleTabChange(1);
            },
          },
        ],
      );

      setState((prevState) => ({
        ...prevState,
        hasError: true,
      }));
    }
  }, [handleTabChange, storeId]);

  const handleLocationUpdate = useCallback(
    async (location: Coordinates) => {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      handleSetSelectedLocation(location);

      try {
        const nearestLocations = await findNearestLocations(
          location,
          groups?.map(({ city }) => city),
          storesQuery.data?.docs,
        );

        handleSetNearestData({
          isInDeliveryZone: nearestLocations.isInDeliveryZone,
          nearestCity: nearestLocations.nearestCity || undefined,
          nearestStore: nearestLocations.nearestStore || undefined,
        });

        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      } catch {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));

        handleMapError();
      }
    },
    [
      groups,
      storesQuery.data?.docs,
      handleMapError,
      handleSetSelectedLocation,
      handleSetNearestData,
    ],
  );

  useEffect(() => {
    if (selectedLocation && storesQuery.data?.docs) {
      handleLocationUpdate(selectedLocation);
    }
  }, [selectedLocation, storesQuery.data?.docs]);

  return (
    <Layout style={{ flexGrow: 1 }}>
      <View style={{ flexGrow: 1, paddingHorizontal: 20 }}>
        <TabView
          selectedIndex={state.selectedTabIndex}
          onSelect={handleTabChange}
          style={{ flexGrow: 1 }}
        >
          <Tab
            title="Выбрать на карте"
            icon={(props) => <Icon {...props} name="pin-outline" />}
            disabled={state.hasError}
          >
            <View style={{ flexGrow: 1, paddingTop: 16 }}>
              <MapStoreSelect
                location={{
                  latitude:
                    selectedLocation?.latitude || DEFAULT_LOCATION.latitude,
                  longitude:
                    selectedLocation?.longitude || DEFAULT_LOCATION.longitude,
                }}
                stores={storesQuery.data?.docs}
                onLocationSelect={handleLocationUpdate}
                onError={handleMapError}
              >
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      position: "absolute",
                      bottom: 60,
                      left: 20,
                      right: 20,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "white",
                        padding: 16,
                        borderRadius: 20,
                        overflow: "hidden",
                      }}
                    >
                      {selectedLocation && !state.isLoading ? (
                        <View style={{ gap: 8 }}>
                          <Text category="s1">Ближайший магазин:</Text>

                          <Text>
                            <Text>{nearestStore?.name}</Text>
                            <Text>, </Text>
                            <Text appearance="hint">
                              {nearestStore?.address}
                            </Text>
                          </Text>
                          <Text
                            status={isInDeliveryZone ? "success" : "danger"}
                          >
                            {isInDeliveryZone
                              ? "Доставка доступна"
                              : "Доставка недоступна"}
                          </Text>
                        </View>
                      ) : (
                        <Text category="s1" style={{ textAlign: "center" }}>
                          Укажите на карте адрес доставки
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: "auto", paddingBottom: 16 }}>
                  <Divider style={{ marginVertical: 16 }} />
                  <Button
                    disabled={state.isLoading || !isInDeliveryZone}
                    onPress={() => {
                      if (nearestStore?.id) {
                        handleStoreSelect(nearestStore.id);
                      }
                    }}
                  >
                    Выбрать магазин
                  </Button>
                </View>
              </MapStoreSelect>
            </View>
          </Tab>
          <Tab
            title="Выбрать вручную"
            icon={(props) => <Icon {...props} name="list-outline" />}
          >
            <View style={{ flexGrow: 1, paddingTop: 16 }}>
              <CustomStoreSelect onStoreSelect={handleStoreSelect} />
            </View>
          </Tab>
        </TabView>
      </View>

      <Loader loading={state.isLoading} />
    </Layout>
  );
}
