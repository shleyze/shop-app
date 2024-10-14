import { AnimatePresence, View } from "moti";
import { Spinner } from "@ui-kitten/components";

import { LoaderProps } from "./types";

export function Loader({
  loading = false,
  hasBackdropColor = true,
}: LoaderProps) {
  return (
    <AnimatePresence>
      {loading && (
        <View
          from={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{ opacity: 0 }}
          exitTransition={{
            type: "timing",
            duration: 200,
          }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: hasBackdropColor
              ? "rgba(0, 0, 0, 0.2)"
              : "transparent",
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner size="giant" />
        </View>
      )}
    </AnimatePresence>
  );
}
