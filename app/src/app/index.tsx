import { ScrollView } from "react-native";
import { useState, Fragment } from "react";
import MapView, { Marker, Polygon } from "react-native-maps";
import { Layout, Button, Text, List, Icon } from "@ui-kitten/components";

// import { useUserLocation } from "@/hooks/useUserLocation/hooks";
import { findNearestLocations } from "@/utils/findNearestLocationAndShop";

import { useUserStore } from "@/hooks/useUser";

export default function Page() {
  // const { isLoading, selectedLocation, currentLocation } = useUserLocation();
  // const [state, setState] = useState({});

  return (
    <ScrollView>
      <Button
        onPress={() => {
          useUserStore.persist.clearStorage();
          useUserStore.setState(useUserStore.getInitialState());
        }}
      >
        C,hjc
      </Button>
      {/*<Layout style={{ paddingBottom: 20 }}>*/}
      {/*  <Text*/}
      {/*    category="h6"*/}
      {/*    style={{*/}
      {/*      color: currentLocation.hasFullInfo ? "green" : "red",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Curren Location*/}
      {/*  </Text>*/}
      {/*  <Text>Region: {currentLocation?.region || "-"}</Text>*/}
      {/*  <Text>Street: {currentLocation?.street || "-"}</Text>*/}
      {/*  <Text>House Number: {currentLocation?.housenumber || "-"}</Text>*/}
      {/*  <Text>*/}
      {/*    Coordinates: {currentLocation?.coordinates?.latitude || "-"},{" "}*/}
      {/*    {currentLocation?.coordinates?.longitude || "-"}*/}
      {/*  </Text>*/}
      {/*</Layout>*/}

      {/*<Layout style={{ paddingBottom: 20 }}>*/}
      {/*  <Text*/}
      {/*    category="h6"*/}
      {/*    style={{*/}
      {/*      color: selectedLocation.hasFullInfo ? "green" : "red",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Selected Location*/}
      {/*  </Text>*/}
      {/*  <Text>Region: {selectedLocation?.region || "-"}</Text>*/}
      {/*  <Text>Street: {selectedLocation?.street || "-"}</Text>*/}
      {/*  <Text>House Number: {selectedLocation?.housenumber || "-"}</Text>*/}
      {/*  <Text>*/}
      {/*    Coordinates: {selectedLocation?.coordinates?.latitude || "-"},{" "}*/}
      {/*    {selectedLocation?.coordinates?.longitude || "-"}*/}
      {/*  </Text>*/}
      {/*</Layout>*/}

      {/*<Layout style={{ alignItems: "center" }}>*/}
      {/*  <Button*/}
      {/*    onPress={async () => {*/}
      {/*      const result = await findNearestLocations(*/}
      {/*        {*/}
      {/*          latitude: currentLocation?.coordinates?.latitude!,*/}
      {/*          longitude: currentLocation?.coordinates?.longitude!,*/}
      {/*        },*/}
      {/*        cities,*/}
      {/*        cities.map((city) => city.shops).flat(),*/}
      {/*      );*/}
      {/*      setState(result);*/}

      {/*      // cityDistance: 193.16*/}
      {/*      // nearestCity: {name: 'Москва', coordinates: {…}, shops: Array(3), estimatedDistance: 1.0499612670403093}*/}
      {/*      // nearestShop: {name: 'Елисеевский магазин', address: 'ул. Тверская, 14', coordinates: {…}, estimatedDistance: 0.30576510794784867}*/}
      {/*      // shopDistance: 51.19*/}
      {/*      console.log("result", result);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Найти ближайший город и магазин*/}
      {/*  </Button>*/}
      {/*</Layout>*/}

      {/*<Layout>*/}
      {/*  <List*/}
      {/*    data={cities}*/}
      {/*    renderItem={({ index, item }) => {*/}
      {/*      return (*/}
      {/*        <Layout key={index} style={{ paddingVertical: 16 }}>*/}
      {/*          <Text style={{ paddingBottom: 8 }} category="h6">*/}
      {/*            {item.name}{" "}*/}
      {/*            <Icon*/}
      {/*              fill="red"*/}
      {/*              name="pin-outline"*/}
      {/*              style={{*/}
      {/*                width: 16,*/}
      {/*                height: 16,*/}
      {/*                opacity: state?.nearestCity?.name === item.name ? 1 : 0,*/}
      {/*              }}*/}
      {/*            />*/}
      {/*          </Text>*/}
      {/*          <List*/}
      {/*            scrollEnabled={false}*/}
      {/*            data={item.shops}*/}
      {/*            renderItem={({ index, item }) => (*/}
      {/*              <Layout key={index}>*/}
      {/*                <Text>*/}
      {/*                  <Icon*/}
      {/*                    fill="red"*/}
      {/*                    name="checkmark-square-outline"*/}
      {/*                    style={{*/}
      {/*                      width: 16,*/}
      {/*                      height: 16,*/}
      {/*                      opacity:*/}
      {/*                        state?.nearestShop?.name === item.name ? 1 : 0,*/}
      {/*                    }}*/}
      {/*                  />*/}
      {/*                  <Text*/}
      {/*                    style={{*/}
      {/*                      fontWeight: "bold",*/}
      {/*                      paddingRight: 8,*/}
      {/*                      paddingLeft: 4,*/}
      {/*                    }}*/}
      {/*                  >*/}
      {/*                    {item.name},{" "}*/}
      {/*                  </Text>*/}
      {/*                  <Text>{item.address}</Text>*/}
      {/*                </Text>*/}
      {/*              </Layout>*/}
      {/*            )}*/}
      {/*            style={{ paddingLeft: 16 }}*/}
      {/*          />*/}
      {/*        </Layout>*/}
      {/*      );*/}
      {/*    }}*/}
      {/*    scrollEnabled={false}*/}
      {/*  />*/}
      {/*</Layout>*/}
    </ScrollView>
  );
}
