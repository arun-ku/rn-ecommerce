import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import ProductDescription from "./ProductDescription";
import Search from "./Search";
import CategoryListing from "./CategoryListing";

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
      <Stack.Screen
        name="Search"
        component={Search}
        initialParams={{ searchText: "" }}
      />
      <Stack.Screen
        name="CategoryListing"
        component={CategoryListing}
        initialParams={{ categoryId: "" }}
      />
    </Stack.Navigator>
  );
};

export default PreOrder;
