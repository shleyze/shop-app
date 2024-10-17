import { View } from "react-native";
import { Spinner } from "@ui-kitten/components";

import { LoaderProps } from "./types";

export function Loader({
  loading = false,
  hasBackdropColor = true,
}: LoaderProps) {
  return loading ? (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: hasBackdropColor
          ? "rgba(0, 0, 0, 0.2)"
          : "transparent",
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner size="giant" />
    </View>
  ) : (
    <></>
  );
}
