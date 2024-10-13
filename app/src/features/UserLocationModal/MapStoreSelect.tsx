import { memo, useEffect, useMemo, Fragment } from "react";
import { View } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";

import { getCurrentLocation } from "@/utils/currentPosition";
import { calculateMapRegionForLocation } from "@/utils/mapDeltas";

import type { MapStoreSelectProps } from "./types";

export const MapStoreSelect = memo(
  ({
    children,
    location,
    stores = [],
    onLocationSelect,
    onError,
  }: MapStoreSelectProps) => {
    const selectedRegion = useMemo(
      () => calculateMapRegionForLocation(location),
      [location.latitude, location.longitude],
    );

    useEffect(() => {
      getCurrentLocation().catch(() => {
        onError?.();
      });
    }, [onError]);

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flexGrow: 1 }}
            region={selectedRegion}
            onPress={({ nativeEvent }) => {
              const { latitude, longitude } = nativeEvent.coordinate;
              onLocationSelect?.({ latitude, longitude });
            }}
          >
            <Marker coordinate={selectedRegion} />
            {stores?.map((shop, index) => (
              <Fragment key={index}>
                <Marker
                  coordinate={shop.coordinates}
                  title={shop.name}
                  description={shop.address}
                  image={require("@/assets/store-icon.png")}
                />
                <Polygon
                  coordinates={shop.deliveryZone.polygon}
                  fillColor="rgba(0, 0, 255, 0.05)"
                  strokeColor="blue"
                  strokeWidth={2}
                />
              </Fragment>
            ))}
          </MapView>
        </View>
        {children}
      </View>
    );
  },
);
