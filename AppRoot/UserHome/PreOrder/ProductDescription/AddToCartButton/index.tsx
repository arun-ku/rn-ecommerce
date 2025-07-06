import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addToCart,
  removeFromCart,
  selectCartItems,
} from "../../../../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { useCallback, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Cart: undefined;
  // Add other screens here as needed
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

interface AddToCartButtonProps {
  handleAddToCart: () => void;
  productId: string;
  variantId: string;
  price: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  handleAddToCart,
  productId,
  variantId,
  price,
}) => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const productsInCart = useSelector((state: RootState) =>
    selectCartItems(state)
  );

  const productInCart = useMemo(() => {
    return productsInCart.find(
      (item) => item.productId === productId && item.variantId === variantId
    );
  }, [productsInCart, productId, variantId]);

  const handleCartNavigation = useCallback(() => {
    navigation.navigate("Cart");
  }, []);

  const handleDecrease = useCallback(() => {
    dispatch(removeFromCart({ productId, variantId, quantity: 1, price }));
  }, [dispatch, productId, variantId, price]);

  const handleIncrease = useCallback(() => {
    dispatch(addToCart({ productId, variantId, quantity: 1, price }));
  }, [dispatch, productId, variantId, price]);

  if (productInCart) {
    return (
      <View style={styles.cartRow}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={handleCartNavigation}
        >
          <SafeAreaView>
            <Text style={styles.cartButtonText}>View Cart</Text>
          </SafeAreaView>
        </TouchableOpacity>
        <View style={styles.quantityContainer}>
          <SafeAreaView
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 8,
                paddingBottom: 0,
              }}
            >
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecrease}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>
                  {productInCart.quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncrease}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
      <SafeAreaView>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 4 }}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addToCartButton: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    borderRadius: 4,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  cartRow: {
    flexDirection: "row",
  },
  cartButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  cartButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  quantityContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderLeftWidth: 1,
    borderLeftColor: "#E0E0E0",
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 4,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "500",
  },
  quantityDisplay: {
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "600",
  },
});

export default AddToCartButton;
