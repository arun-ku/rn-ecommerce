import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import ProductDescription from "./ProductDescription";

const Stack = createStackNavigator();

const PreOrder = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} options={{}} />
      <Stack.Screen
        name="ProductDescription"
        component={ProductDescription}
        initialParams={{ product: null }}
        options={{
          presentation: "card",
        }}
      />
    </Stack.Navigator>
  );
};

export default PreOrder;
