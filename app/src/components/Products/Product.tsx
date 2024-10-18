import { Image, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "@ui-kitten/components";
import { useMemo, useState } from "react";
import { Link } from "expo-router";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { Loader } from "@/components/Loader";

import { ProductProps } from "./types";
import { getImageSrc } from "@/utils/getImageSrc";

export function Product({ product }: ProductProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const cartProducts = useCart((state) => state.products);
  const handleAddToCart = useCart((state) => state.actions.addProductToCart);
  const handleRemoveProductFromCart = useCart(
    (state) => state.actions.removeProductFromCart,
  );

  const productsById = useMemo(
    () => cartProducts.map((item) => item.id),
    [cartProducts],
  );
  const countInCart = useMemo(() => {
    return productsById.filter((id) => product.id === id).length;
  }, [productsById, product.id]);

  const imageSrc = useMemo(() => {
    return getImageSrc(product.mainImage);
  }, [product.mainImage]);

  return (
    <View
      style={{
        flexGrow: 1,
        gap: 8,
        flex: 1,
      }}
    >
      <View
        style={{
          aspectRatio: 1,
          position: "relative",
        }}
      >
        <Link
          asChild
          href={{
            pathname: "/product/[product]",
            params: { product: product.id },
          }}
          style={{
            flexGrow: 1,
          }}
        >
          <TouchableOpacity>
            <Image
              style={{
                aspectRatio: 1,
                objectFit: "cover",
                borderRadius: 16,
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "absolute",
              }}
              source={imageSrc}
              onLoadStart={() => setLoading(true)}
              onLoad={() => setLoading(false)}
            />
          </TouchableOpacity>
        </Link>
        <Loader loading={loading} hasBackdropColor={false} />

        <View
          style={{
            position: "absolute",
            right: 16,
            bottom: 16,
            backgroundColor: "white",
            padding: 4,
            borderRadius: 4,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            borderStyle: "solid",
            borderColor: theme["color-basic-400"],
            borderWidth: 1,
          }}
        >
          <Text>{formatPrice(product.price)}</Text>
          <View
            style={{
              width: 1,
              backgroundColor: theme["color-basic-500"],
              height: "80%",
            }}
          />
          {countInCart ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  handleRemoveProductFromCart(product);
                }}
              >
                <Icon
                  name="minus-outline"
                  fill={theme["color-primary-600"]}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
              <Text>{countInCart}</Text>
            </>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              handleAddToCart(product);
            }}
          >
            <Icon
              name="plus-outline"
              fill={theme["color-primary-600"]}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, gap: 4 }}>
        <Text category="s1">{product.name}</Text>
        <Text category="s2" appearance="hint">
          {product.description}
        </Text>
      </View>
    </View>
  );
}
