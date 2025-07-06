import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCartTotalQuantity } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";

const styles = StyleSheet.create({
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    position: "relative",
  },
  animatedContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    marginTop: 4,
  },
  boldText: {
    fontWeight: "bold",
  },
  normalText: {
    fontWeight: "normal",
  },
  activeIcon: {
    color: "#7f8c8d",
  },
  inactiveIcon: {
    color: "#bdc3c7",
  },
  cartBadgeContainer: {
    position: "absolute",
    top: -8,
    right: 24,
    backgroundColor: "#e74c3c",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
  },
});

export const HomeTabButton = (props: BottomTabBarButtonProps) => {
  const viewRef = useRef<Animated.View>(null);
  const { onPress } = props;
  const focused = props["aria-selected"] || false;

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withTiming(focused ? 1.2 : 1, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [focused]);

  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Animated.View
        ref={viewRef}
        style={[styles.animatedContainer, animatedStyle]}
      >
        <FontAwesome
          name="home"
          size={20}
          style={focused ? styles.activeIcon : styles.inactiveIcon}
        />
        <Text style={focused ? styles.boldText : styles.normalText}>Home</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const CartTabButton = (props: BottomTabBarButtonProps) => {
  const totalItems = useSelector((state: RootState) =>
    selectCartTotalQuantity(state)
  );
  const viewRef = useRef<Animated.View>(null);
  const { onPress } = props;
  const focused = props["aria-selected"] || false;

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withTiming(focused ? 1.2 : 1, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [focused]);

  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Animated.View
        ref={viewRef}
        style={[styles.animatedContainer, animatedStyle]}
      >
        <FontAwesome
          name="shopping-cart"
          size={20}
          style={focused ? styles.activeIcon : styles.inactiveIcon}
        />
        <Text
          style={[
            styles.tabText,
            focused ? styles.boldText : styles.normalText,
          ]}
        >
          Cart
        </Text>
      </Animated.View>
      {totalItems > 0 && (
        <View style={styles.cartBadgeContainer}>
          <Text style={styles.cartBadgeText}>{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const WishlistTabButton = (props: BottomTabBarButtonProps) => {
  const viewRef = useRef<Animated.View>(null);
  const { onPress } = props;
  const focused = props["aria-selected"] || false;

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withTiming(focused ? 1.2 : 1, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [focused]);

  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Animated.View
        ref={viewRef}
        style={[styles.animatedContainer, animatedStyle]}
      >
        <FontAwesome
          name="heart"
          size={20}
          style={focused ? styles.activeIcon : styles.inactiveIcon}
        />
        <Text
          style={[
            styles.tabText,
            focused ? styles.boldText : styles.normalText,
          ]}
        >
          Wishlist
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const ProfileTabButton = (props: BottomTabBarButtonProps) => {
  const viewRef = useRef<Animated.View>(null);
  const { onPress } = props;
  const focused = props["aria-selected"] || false;

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withTiming(focused ? 1.2 : 1, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [focused]);

  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Animated.View
        ref={viewRef}
        style={[styles.animatedContainer, animatedStyle]}
      >
        <FontAwesome
          name="user"
          size={20}
          style={focused ? styles.activeIcon : styles.inactiveIcon}
        />
        <Text
          style={[
            styles.tabText,
            focused ? styles.boldText : styles.normalText,
          ]}
        >
          Profile
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
