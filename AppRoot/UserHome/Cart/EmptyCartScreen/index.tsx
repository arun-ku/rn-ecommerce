import { Text, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const EmptyCartScreen = () => {
  return (
    <View style={styles.container}>
      <FontAwesome name="shopping-cart" size={64} color="#888" />
      <Text style={styles.title}>Your cart is empty</Text>
      <Text style={styles.subtitle}>
        Add items to your cart to see them here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "#555",
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
  },
});

export default EmptyCartScreen;
