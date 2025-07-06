import { createStackNavigator } from "@react-navigation/stack";
import UserHome from "./UserHome";
import Checkout from "./Checkout";
import ThankYou from "./ThankYou";

const Stack = createStackNavigator();

const AppRoot = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserHome" component={UserHome} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="ThankYou" component={ThankYou} />
    </Stack.Navigator>
  );
};

export default AppRoot;
