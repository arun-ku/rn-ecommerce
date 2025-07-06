import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
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
    <View style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#3498db",
          padding: 8,
        }}
      >
        <SafeAreaView style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Text
              style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold" }}
            >
              Checkout
            </Text>
            <View style={{ position: "absolute", left: 16, top: 4 }}>
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
      <ScrollView style={{ flex: 1, backgroundColor: "#f8f8f8", padding: 10 }}>
        <OrderSummary />
        <Address />
      </ScrollView>
      <View style={{ padding: 8, backgroundColor: "#3498db" }}>
        <SafeAreaView>
          <TouchableOpacity
            style={{ padding: 8, borderRadius: 8 }}
            onPress={handleOrderPlace}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              Place Order (Cash on Delivery)
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Checkout;
