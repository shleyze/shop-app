import type { Image } from "@/types";

import type { ImageSourcePropType } from "react-native/Libraries/Image/Image";

export function getImageSrc(param: Image | undefined): ImageSourcePropType {
  if (param?.url) {
    try {
      return {
        uri: new URL(param?.url, param?.prefix).toString(),
        width: param?.width,
        height: param?.height,
      };
    } catch {}
  }

  return require("@/assets/product-placeholder.png");
}
