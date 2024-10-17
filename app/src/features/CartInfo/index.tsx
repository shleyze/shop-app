import { TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "@ui-kitten/components";
import { useRouter, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";

export function CartInfo() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const isCartEmpty = useCart((state) => state.isCartEmpty);
  const totalCount = useCart((state) => state.totalCount);
  const totalPrice = useCart((state) => state.totalPrice);

  const isHidden = pathname.includes("order");

  return (
    <>
      {isCartEmpty || isHidden ? null : (
        <View
          style={{
            position: "absolute",
            right: insets.right,
            bottom: insets.bottom,
            marginRight: 16,
            marginBottom: 16,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            disabled={isCartEmpty}
            style={{
              backgroundColor: theme["color-primary-default"],
              padding: 16,
              borderRadius: 50,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
            onPress={() => {
              router.push("/order");
            }}
          >
            <Text category="s2" style={{ color: theme["color-basic-100"] }}>
              {formatPrice(totalPrice)}
            </Text>

            <Icon
              name="shopping-cart-outline"
              fill={theme["color-basic-100"]}
              style={{
                width: 30,
                height: 30,
              }}
            />

            <View
              style={{
                position: "absolute",
                right: 8,
                top: 8,
                backgroundColor: "white",
                borderRadius: 12,
                minWidth: 20,
                alignItems: "center",
                padding: 2,
              }}
            >
              <Text category="c2">{totalCount}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
