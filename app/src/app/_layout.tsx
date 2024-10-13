import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SafeAreaView } from "react-native";
// import {
//   requestForegroundPermissionsAsync,
//   getCurrentPositionAsync,
// } from "expo-location";
// import { useEffect, useCallback } from "react";

import { UserLocationModal } from "src/features/UserLocationModal";
import { Header } from "@/components/Header";
import { isWebPlatform } from "@/utils/platforms";
// import { useAuth } from "@/hooks/useAuth";
// import { useLocationStore } from "src/hooks/useUserLocation";
// import { openRouteClient } from "@/api";
// import { getCurrentLocation } from "@/utils/currentPosition";
// import { getGeocodeReverse } from "@/api/geocode";

const queryClient = new QueryClient();

export default function Layout() {
  // const coordinates = useLocationStore((state) => state.coordinates);
  // const hasFullInfo = useLocationStore((state) => state.hasFullInfo);
  // const setCoordinates = useLocationStore(
  //   (state) => state.actions.setCoordinates,
  // );
  // const setLocation = useLocationStore((state) => state.actions.setLocation);

  // const requestLocation = useCallback(async () => {
  //   if (!coordinates) {
  //     const location = await getCurrentLocation();
  //     setCoordinates({
  //       longitude: location.coords.longitude,
  //       latitude: location.coords.latitude,
  //     });
  //   }
  //
  //   if (!hasFullInfo) {
  //     const result = await getGeocodeReverse({
  //       longitude: coordinates?.longitude!,
  //       latitude: coordinates?.latitude!,
  //       size: 1,
  //     });
  //
  //     console.log("result.data?.features", result.data?.features);
  //     setLocation({
  //       street: result.data?.features[0].properties.street,
  //       housenumber: result.data?.features[0].properties.housenumber,
  //       region: result.data?.features[0].properties.region,
  //     });
  //   }
  // }, [coordinates, hasFullInfo]);

  // useEffect(() => {
  //   requestLocation();
  // }, [requestLocation]);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaView>
            <UserLocationModal />
            <Header />
          </SafeAreaView>
          <Slot />

          {isWebPlatform && <ReactQueryDevtools />}
        </QueryClientProvider>
      </ApplicationProvider>
    </>
  );
}
