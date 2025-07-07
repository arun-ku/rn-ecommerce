import { Image, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../../../../../models/product/product";
import ProductTag from "./ProductTag";

const ProductItem = ({ item }: { item: Product }) => (
  <TouchableOpacity style={styles.productCard}>
    <Image source={{ uri: item.images[0] }} style={styles.productImage} />
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription} numberOfLines={2}>
        {item.description}
      </Text>
      {item.variants.length > 0 && (
        <Text style={styles.productPrice}>
          ${item.variants[0].variantPrice.toFixed(2)}
        </Text>
      )}
      <View style={styles.tagsContainer}>
        {item.tags.slice(0, 3).map((tag, index) => (
          <View key={index}>
            <ProductTag item={tag} />
          </View>
        ))}
        {item.tags.length > 3 && (
          <Text style={styles.moreTags}>+{item.tags.length - 3} more</Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const styles = {
  productCard: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  moreTags: {
    color: "#888",
    fontSize: 12,
  },
};

export default ProductItem;
