import { Animated, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { selectCartItems } from "../../../../redux/slices/cartSlice";
import CartItem from "./CartItem";
import { useRef } from "react";

const ProductList = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const products = useSelector((state: RootState) => selectCartItems(state));

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={products}
        renderItem={({ item, index }) => (
          <CartItem cartItem={item} scrollY={scrollY} index={index} />
        )}
        keyExtractor={(item) => `${item.productId}-${item.variantId}`}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 8,
    width: "100%",
  },
  flatListContent: {
    width: "100%",
  },
});

export default ProductList;
