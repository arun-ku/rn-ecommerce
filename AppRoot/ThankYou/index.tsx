import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  UserHome: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const ThankYou = () => {
  const navigation = useNavigation<NavigationProps>();
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString();

  // Sample address data (in a real app, this would come from your state/props)
  const userAddress = {
    name: "John Doe",
    street: "123 Main Street",
    city: "Dubai",
    state: "Dubai",
    zipCode: "12345",
    country: "UAE",
    phone: "+971 55 123 4567",
  };

  const handleHomeNavigation = useCallback(() => {
    navigation.navigate("UserHome");
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.card}>
            {/* Success icon */}
            <View style={styles.iconContainer}>
              <View style={styles.checkCircle}>
                <View style={styles.checkmark} />
              </View>
            </View>

            <Text style={styles.title}>Thank You!</Text>
            <Text style={styles.subtitle}>
              Your order has been placed successfully
            </Text>

            <View style={styles.orderInfoCard}>
              <Text style={styles.orderInfoTitle}>Order Details</Text>
              <View style={styles.orderInfoRow}>
                <Text style={styles.orderInfoLabel}>Order Number:</Text>
                <Text style={styles.orderInfoValue}>{orderNumber}</Text>
              </View>
              <View style={styles.orderInfoRow}>
                <Text style={styles.orderInfoLabel}>Date:</Text>
                <Text style={styles.orderInfoValue}>{orderDate}</Text>
              </View>
              <View style={styles.orderInfoRow}>
                <Text style={styles.orderInfoLabel}>Payment Method:</Text>
                <Text style={styles.orderInfoValue}>Cash On Delivery</Text>
              </View>
            </View>

            {/* New Address Section */}
            <View style={styles.orderInfoCard}>
              <Text style={styles.orderInfoTitle}>Delivery Address</Text>
              <View style={styles.addressContainer}>
                <Text style={styles.addressName}>{userAddress.name}</Text>
                <Text style={styles.addressText}>{userAddress.street}</Text>
                <Text style={styles.addressText}>
                  {userAddress.city}, {userAddress.state} {userAddress.zipCode}
                </Text>
                <Text style={styles.addressText}>{userAddress.country}</Text>
                <Text style={styles.addressText}>{userAddress.phone}</Text>
              </View>
            </View>

            <Text style={styles.message}>
              We've sent a confirmation email with your order details. You can
              track your order in the "My Orders" section.
            </Text>

            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Track My Order</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleHomeNavigation}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    width: 30,
    height: 15,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "white",
    transform: [{ rotate: "-45deg" }],
    marginTop: -5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  orderInfoCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  orderInfoTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  orderInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderInfoLabel: {
    fontSize: 14,
    color: "#666",
  },
  orderInfoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  addressContainer: {
    marginBottom: 8,
  },
  addressName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#4CAF50",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default ThankYou;
