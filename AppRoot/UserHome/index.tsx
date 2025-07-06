import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

import PreOrder from "./PreOrder";
import {
  HomeTabButton,
  CartTabButton,
  ProfileTabButton,
  WishlistTabButton,
} from "../../components/BottomTabButtons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Cart from "./Cart";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

const UserHome = () => {
  return (
    <Tab.Navigator
      initialRouteName="PreOrder"
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#95a5a6",
        tabBarInactiveTintColor: "#bdc3c7",
        tabBarStyle: {
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        },
      }}
    >
      <Tab.Screen
        name="PreOrder"
        component={PreOrder}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
          const hideOnScreens = ["ProductDescription"];
          return {
            title: "Home",
            tabBarButton: HomeTabButton,
            tabBarStyle: hideOnScreens.includes(routeName)
              ? { display: "none" }
              : undefined,
          };
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: ProfileTabButton,
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={View}
        options={{
          tabBarButton: WishlistTabButton,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarButton: CartTabButton,
        }}
      />
    </Tab.Navigator>
  );
};

export default UserHome;
