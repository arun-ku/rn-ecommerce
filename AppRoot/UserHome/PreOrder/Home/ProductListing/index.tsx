import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProductCard from "./ProductCard";

interface ProductListingProps {
  products: string[];
}

const ProductListing: FC<ProductListingProps> = ({ products = [] }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          marginBottom: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 10 }}>
          Featured Products
        </Text>
        <TouchableOpacity
          onPress={() => alert("See All Products")}
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text style={{ color: "#888", fontSize: 16, fontWeight: "600" }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      {products?.slice(0, 6).map((item, index) => (
        <ProductCard key={item} productId={item} index={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
});

export default ProductListing;
