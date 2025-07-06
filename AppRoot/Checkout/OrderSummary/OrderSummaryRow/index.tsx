import { StyleSheet, Text, View } from "react-native";

interface OrderSummaryRowProps {
  label: string;
  value: string | number;
  boldContent?: boolean;
  isTotal?: boolean;
  isLast?: boolean;
}

const OrderSummaryRow = ({
  label,
  value,
  boldContent,
  isTotal,
  isLast = false,
}: OrderSummaryRowProps) => {
  return (
    <View
      style={[
        styles.container,
        isTotal && styles.totalContainer,
        isLast && styles.lastRow,
      ]}
    >
      <Text style={[styles.label, isTotal && styles.totalText]}>{label}</Text>
      <Text
        style={[
          styles.value,
          boldContent && styles.boldValue,
          isTotal && styles.totalText,
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  totalContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 14,
    color: "#666666",
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: "#333333",
    textAlign: "right",
  },
  boldValue: {
    fontWeight: "600",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  lastRow: {
    borderBottomWidth: 0,
  },
});

export default OrderSummaryRow;
