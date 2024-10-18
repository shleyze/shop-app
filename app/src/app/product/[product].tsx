import { ScrollView, View, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Button, Icon, Text } from "@ui-kitten/components";

import { Category } from "@/components/Category";
import { Loader } from "@/components/Loader";
import { Footer } from "@/components/Footer";

import { useProductQuery } from "@/hooks/useProduct";
import { getImageSrc } from "@/utils/getImageSrc";
import { useCart } from "@/hooks/useCart";

export default function ProductPage() {
  const { product } = useLocalSearchParams<{ product: string }>();
  const [imageLoading, setImageLoading] = useState(false);

  const productQuery = useProductQuery({ productId: product });

  const imageSrc = useMemo(() => {
    return getImageSrc(productQuery?.data?.mainImage);
  }, [productQuery?.data?.mainImage]);

  const handleAddProductToCart = useCart(
    (state) => state.actions.addProductToCart,
  );
  const handleRemoveProductFromCart = useCart(
    (state) => state.actions.removeProductFromCart,
  );

  const productsInCart = useCart((state) => state.products);

  const currentProductsInCart = useMemo(() => {
    return productsInCart.filter((p) => p.id === product);
  }, [productsInCart, product]);

  const currentProductsInCartCounter = useMemo(() => {
    return currentProductsInCart.length;
  }, [currentProductsInCart]);

  return (
    <>
      <View style={{ flex: 1, flexGrow: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flexGrow: 1,
              paddingHorizontal: 16,
              gap: 32,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "100%",
                  paddingTop: "100%",
                  flexGrow: 1,
                  position: "relative",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                >
                  <Image
                    style={{
                      objectFit: "cover",
                      borderRadius: 16,
                      width: "100%",
                      height: "100%",
                      flexGrow: 1,
                    }}
                    source={imageSrc}
                    onLoadStart={() => setImageLoading(true)}
                    onLoad={() => setImageLoading(false)}
                  />
                  <Loader
                    loading={productQuery.isLoading ? false : imageLoading}
                    hasBackdropColor={false}
                  />
                </View>
              </View>
            </View>
            <View style={{ gap: 16 }}>
              <View style={{ gap: 8 }}>
                <Text category="h4">{productQuery.data?.name}</Text>
                <Text category="s1" appearance="hint">
                  {productQuery.data?.description}
                </Text>
              </View>
              <Text>{productQuery.data?.fullDescription}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
                minHeight: 46,
              }}
            >
              {currentProductsInCartCounter ? (
                <>
                  <Button
                    appearance="ghost"
                    accessoryLeft={(props) => (
                      <Icon {...props} name="minus-outline" />
                    )}
                    onPress={() => {
                      handleRemoveProductFromCart(productQuery?.data!);
                    }}
                  />
                </>
              ) : (
                <></>
              )}

              <Button
                style={{ flexGrow: 1 }}
                onPress={() => {
                  handleAddProductToCart(productQuery?.data!);
                }}
              >
                {currentProductsInCartCounter
                  ? `В корзине: ${currentProductsInCartCounter}`
                  : "Добавить в корзину"}
              </Button>
            </View>
            <Category title="Рекомендации" limit={2} />
          </View>
          <Footer />
        </ScrollView>
      </View>
      <Loader loading={productQuery.isLoading} />
    </>
  );
}
