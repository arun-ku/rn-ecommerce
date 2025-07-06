import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import OrderSummaryRow from "./OrderSummaryRow";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from "../../../redux/slices/cartSlice";
import { useMemo } from "react";

const OrderSummary = () => {
  const totalItems = useSelector((state: RootState) =>
    selectCartTotalQuantity(state)
  );
  const totalPrice = useSelector((state: RootState) =>
    selectCartTotalPrice(state)
  );

  const [totalTax, priceWithoutTax, shippingFee, totalAmount] = useMemo(() => {
    const taxRate = 0.1; // Example tax rate of 10%
    const shipping = 5.0;
    const tax = totalPrice * taxRate;
    const totalAmount = totalPrice + shipping;
    return [
      tax.toFixed(2),
      (totalPrice - tax).toFixed(2),
      shipping.toFixed(2),
      totalAmount.toFixed(2),
    ];
  }, [totalPrice]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>

      <View style={styles.rowsContainer}>
        <OrderSummaryRow label="Total Items" value={totalItems.toString()} />
        <OrderSummaryRow label="Total Price" value={`$${priceWithoutTax}`} />
        <OrderSummaryRow label="Total Tax" value={`$${totalTax}`} />
        <OrderSummaryRow
          isLast
          label="Shipping Fee"
          value={`$${shippingFee}`}
        />
      </View>

      <OrderSummaryRow
        label="Total Amount"
        value={`$${totalAmount}`}
        boldContent
        isTotal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 16,
    marginHorizontal: 12,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#303030",
    marginBottom: 16,
  },
  rowsContainer: {
    marginVertical: 8,
  },
  rowLabel: {
    fontSize: 15,
    color: "#707070",
  },
  rowValue: {
    fontSize: 15,
    color: "#404040",
  },
  divider: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    marginVertical: 16,
  },
  totalContainer: {
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#303030",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
});

export default OrderSummary;
