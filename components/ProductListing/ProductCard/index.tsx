import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { selectProductById } from "../../../redux/slices/productSlice";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import Animated, { FadeInDown, Easing } from "react-native-reanimated";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";

type RootStackParamList = {
  ProductDescription: { productId: string };
};

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductDescription"
>;

interface ProductCardProps {
  productId: string;
  index: number;
}

const ProductCard = ({ productId, index }: ProductCardProps) => {
  const navigation = useNavigation<NavigationProp>();
  const product = useSelector((state: RootState) =>
    selectProductById(state, productId)
  );

  return (
    <TouchableOpacity
      key={product.productId}
      style={[
        styles.productItem,
        index % 2 === 0 ? styles.productItemEven : styles.productItemOdd,
      ]}
      onPress={() => {
        navigation.navigate("ProductDescription", {
          productId: product.productId,
        });
      }}
    >
      <Animated.View
        key={product.productId}
        entering={FadeInDown.delay(100)
          .duration(500)
          .easing(Easing.inOut(Easing.ease))}
      >
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Animated.Image
              resizeMode="cover"
              source={{ uri: product.images[0] }}
              style={styles.image}
            />
            {product.tags && product.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {product.tags.map((tag, tagIndex) => (
                  <View
                    key={tagIndex}
                    style={[
                      styles.tag,
                      { backgroundColor: tag.bgColor || "#f0f0f0" },
                    ]}
                  >
                    {tag.prefixIcon && (
                      <FontAwesome
                        name={tag.prefixIcon as any}
                        size={8}
                        color={tag.prefixIconColor || "#000"}
                        style={styles.tagIcon}
                      />
                    )}
                    <Text
                      style={[
                        styles.tagLabel,
                        { color: tag.textColor || "#000" },
                      ]}
                    >
                      {tag.label}
                    </Text>
                    {tag.postfixIcon && (
                      <FontAwesome
                        name={tag.postfixIcon as any}
                        size={8}
                        color={tag.postFixIconColor || "#000"}
                        style={styles.tagIcon}
                      />
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={styles.details}>
            <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
              {product.name}
            </Text>
            <View style={styles.priceVariantsRow}>
              <Text style={styles.price}>
                ${product.variants[0].variantPrice}
              </Text>
              <View style={styles.variantsContainer}>
                {product.variants?.slice(0, 3).map((variant) => (
                  <View
                    key={variant.variantId}
                    style={[
                      styles.variantDot,
                      { backgroundColor: variant.variantColor.value },
                    ]}
                  />
                ))}
                {product.variants.length > 3 && (
                  <View style={styles.moreDot}>
                    <Text style={styles.moreText}>
                      +{product.variants.length - 3}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productItem: {
    width: "48%",
    position: "relative",
  },
  productItemEven: {
    marginRight: "2%",
    marginLeft: "0%",
  },
  productItemOdd: {
    marginRight: "0%",
    marginLeft: "2%",
  },
  card: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  details: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    lineHeight: 18,
    minHeight: 36,
    fontWeight: "700",
  },
  priceVariantsRow: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
  },
  price: {
    marginTop: 5,
    fontWeight: "500",
  },
  variantsContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
  },
  variantDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  moreDot: {
    backgroundColor: "#ccc",
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  moreText: {
    fontSize: 8,
    color: "#000",
    fontWeight: "700",
  },
  imageContainer: {
    position: "relative",
  },
  tagsContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "90%",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  tagIcon: {
    fontSize: 10,
    marginHorizontal: 2,
  },
  tagLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
});

export default ProductCard;
