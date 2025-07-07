import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Product, Variant } from "../../../../../models/product/product";

interface ProductInfoProps {
  product: Product;
  handleVariantSelect: (variantId: string) => void;
  selectedVariant: Variant;
}

const ProductInfo: FC<ProductInfoProps> = ({
  product,
  handleVariantSelect,
  selectedVariant,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.price}>${selectedVariant.variantPrice}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Options</Text>
        <View style={styles.variantsContainer}>
          {product.variants?.map((variant, index) => {
            const isSelected = selectedVariant.variantId === variant.variantId;
            return (
              <TouchableOpacity
                onPress={() => handleVariantSelect(variant.variantId)}
                key={index}
              >
                <View
                  style={[
                    styles.colorOption,
                    { backgroundColor: variant.variantColor.value },
                    isSelected && styles.selectedColorOption,
                  ]}
                >
                  {isSelected && <View style={styles.innerSelectedCircle} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          {product.description}
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 24,
  },
  productName: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    color: "#34495e",
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
    color: "#3498db",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#34495e",
    letterSpacing: 0.5,
  },
  variantsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorOption: {
    height: 44,
    width: 44,
    borderRadius: 22,
    marginRight: 12,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedColorOption: {
    borderColor: "#34495e",
  },
  innerSelectedCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#7f8c8d",
    letterSpacing: 0.3,
  },
});

export default ProductInfo;
