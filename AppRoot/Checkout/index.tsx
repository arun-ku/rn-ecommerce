import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import OrderSummary from "./OrderSummary";
import Address from "./Address";

import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";

type RootStackParamList = {
  ThankYou: undefined;
  // Add other screens here as needed
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const Checkout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const handleOrderPlace = () => {
    dispatch(clearCart());
    navigation.navigate("ThankYou");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContent}>
            <Text style={styles.headerText}>Checkout</Text>
            <View style={styles.backButton}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <FontAwesome name="arrow-left" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <ScrollView style={styles.scrollView}>
        <OrderSummary />
        <Address />
      </ScrollView>
      <View style={styles.footer}>
        <SafeAreaView>
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handleOrderPlace}
          >
            <Text style={styles.placeOrderText}>
              Place Order (Cash on Delivery)
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db",
    padding: 8,
  },
  safeArea: {
    width: "100%",
  },
  headerContent: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  headerText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 4,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  footer: {
    padding: 8,
    backgroundColor: "#3498db",
  },
  placeOrderButton: {
    padding: 8,
    borderRadius: 8,
  },
  placeOrderText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default Checkout;
