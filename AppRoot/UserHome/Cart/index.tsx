import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import {
  selectCartItemCount,
  selectCartItems,
  selectCartTotalPrice,
} from "../../../redux/slices/cartSlice";
import EmptyCartScreen from "./EmptyCartScreen";
import ProductList from "./ProductList";
import { useCallback } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Checkout: undefined;
  // Add other screens here as needed
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const Cart = () => {
  const navigation = useNavigation<NavigationProps>();
  const productsInCart = useSelector((state: RootState) =>
    selectCartItems(state)
  );
  const totalQuantity = useSelector((state: RootState) =>
    selectCartItemCount(state)
  );
  const totalPrice = useSelector((state: RootState) =>
    selectCartTotalPrice(state)
  );

  const handleCheckout = useCallback(() => {
    navigation.navigate("Checkout");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerRow}>
            <Text style={styles.titleText}>Cart</Text>
            <Text style={styles.quantityText}>({totalQuantity})</Text>
          </View>
        </SafeAreaView>
      </View>
      {totalQuantity === 0 ? <EmptyCartScreen /> : <ProductList />}
      {totalQuantity !== 0 && (
        <View style={styles.footerContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>${totalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.checkoutContainer}>
            <TouchableOpacity onPress={handleCheckout}>
              <View style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
                <View style={styles.checkoutIconContainer}>
                  <FontAwesome name="arrow-right" size={12} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#3498db",
    width: "100%",
  },
  safeArea: {
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    padding: 12,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 24,
    color: "#fff",
    justifyContent: "flex-end",
    lineHeight: 24,
    fontWeight: "700",
  },
  quantityText: {
    fontSize: 16,
    color: "#fff",
    justifyContent: "flex-end",
    marginBottom: 3,
  },
  footerContainer: {
    padding: 8,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  priceContainer: {
    flex: 1,
  },
  priceText: {
    fontSize: 20,
    color: "#555",
    fontWeight: "600",
  },
  checkoutContainer: {
    flex: 1,
  },
  checkoutButton: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "100%",
  },
  checkoutButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  checkoutIconContainer: {
    backgroundColor: "rgba(256, 256, 256, 0.1)",
    borderRadius: 8,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Cart;
