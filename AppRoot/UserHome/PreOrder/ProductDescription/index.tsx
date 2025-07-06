import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Header from "./Header";
import { useCallback, useRef, useState } from "react";
import ProductInfo from "./ProductInfo";
import { useDispatch, useSelector } from "react-redux";
import { selectProductById } from "../../../../redux/slices/productSlice";
import { RootState } from "../../../../redux/store";
import { addToCart } from "../../../../redux/slices/cartSlice";
import AddToCartButton from "./AddToCartButton";

const ProductDescription = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { productId } = route.params as { productId: string };
  const product = useSelector((state: RootState) =>
    selectProductById(state, productId)
  );

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const navigation = useNavigation();
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleVariantSelect = useCallback(
    (variantId: string) => {
      const variant = product.variants.find((v) => v.variantId === variantId);
      if (variant) {
        setSelectedVariant(variant);
      }
    },
    [product.variants]
  );

  const handleAddToCart = useCallback(() => {
    dispatch(
      addToCart({
        productId: product.productId,
        variantId: selectedVariant.variantId,
        quantity: 1,
        price: selectedVariant.variantPrice,
      })
    );
  }, [
    product.productId,
    selectedVariant.variantId,
    selectedVariant.variantPrice,
    dispatch,
  ]);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={[1]}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
        ListHeaderComponent={
          <Header images={product.images} scrollY={scrollY} />
        }
        renderItem={({ item }) => (
          <ProductInfo
            product={product}
            handleVariantSelect={handleVariantSelect}
            selectedVariant={selectedVariant}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <AddToCartButton
        handleAddToCart={handleAddToCart}
        productId={product.productId}
        variantId={selectedVariant.variantId}
        price={selectedVariant.variantPrice}
      />
      <Animated.View style={styles.headerOverlay}>
        <SafeAreaView style={styles.headerContent}>
          <TouchableOpacity onPress={handleBackPress}>
            <View style={styles.iconButton}>
              <FontAwesome name="arrow-left" size={24} color="#7f8c8d" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.iconButton}>
              <FontAwesome name="heart" size={24} color="#7f8c8d" />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});

export default ProductDescription;
