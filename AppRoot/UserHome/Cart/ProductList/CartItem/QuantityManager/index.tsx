import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
} from "../../../../../../redux/slices/cartSlice";
import { useCallback } from "react";

interface QuantityManagerProps {
  productId: string;
  variantId: string;
  price: number;
  quantity: number;
}

const QuantityManager: React.FC<QuantityManagerProps> = ({
  productId,
  variantId,
  price,
  quantity = 0,
}) => {
  const dispatch = useDispatch();

  const handleDecrease = useCallback(() => {
    dispatch(removeFromCart({ productId, variantId, quantity: 1, price }));
  }, [dispatch, productId, variantId, price]);

  const handleIncrease = useCallback(() => {
    dispatch(addToCart({ productId, variantId, quantity: 1, price }));
  }, [dispatch, productId, variantId, price]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDecrease}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleIncrease}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 4,
  },
  buttonText: {
    fontWeight: "bold",
  },
  quantityContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    textAlign: "center",
    fontSize: 12,
    color: "#555",
    fontWeight: "600",
  },
});

export default QuantityManager;
