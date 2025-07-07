import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CartItem as CartItemType } from "../../../../../redux/slices/cartSlice";
import { selectProductById } from "../../../../../redux/slices/productSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { useMemo } from "react";
import QuantityManager from "./QuantityManager";

interface CartItemProps {
  cartItem: CartItemType;
  scrollY: Animated.Value;
  index: number;
}

const ITEM_HEIGHT = 130;

const CartItem = ({ cartItem, scrollY, index }: CartItemProps) => {
  const { productId, variantId, quantity } = cartItem;
  const productDetails = useSelector((state: RootState) =>
    selectProductById(state, productId)
  );
  const variantDetails = useMemo(() => {
    return productDetails?.variants.find(
      (variant) => variant.variantId === variantId
    );
  }, [cartItem.variantId, productDetails]);
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: scrollY.interpolate({
            inputRange: [-1, 0, ITEM_HEIGHT * index, ITEM_HEIGHT * (index + 1)],
            outputRange: [1, 1, 1, 0],
          }),
          transform: [
            {
              scale: scrollY.interpolate({
                inputRange: [
                  -1,
                  0,
                  ITEM_HEIGHT * index,
                  ITEM_HEIGHT * (index + 2),
                ],
                outputRange: [1, 1, 1, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.rowContainer}>
        <View>
          <Image
            source={{ uri: productDetails?.images[0] }}
            resizeMode="cover"
            style={styles.productImage}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.productName}>{productDetails?.name}</Text>
            <View
              style={[
                styles.colorIndicator,
                { backgroundColor: variantDetails?.variantColor?.value },
              ]}
            ></View>
          </View>

          <View style={styles.priceQuantityRow}>
            <Text style={styles.priceText}>
              ${variantDetails?.variantPrice.toFixed(2)}
            </Text>
            <QuantityManager
              productId={productId}
              variantId={variantId}
              price={variantDetails?.variantPrice || 0}
              quantity={quantity}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    width: "100%",
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  colorIndicator: {
    marginTop: 8,
    height: 20,
    width: 20,
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  priceQuantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
});

export default CartItem;
