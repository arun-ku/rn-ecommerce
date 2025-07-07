import { useMemo } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { RootState } from "../../../../redux/store";
import { selectAllProductsById } from "../../../../redux/slices/productSlice";
import { Product, Tag } from "../../../../models/product/product";
import ProductItem from "./ProductItem";

const Search = () => {
  const route = useRoute();
  const { searchText } = route.params as { searchText: string };
  const allProductsById = useSelector((state: RootState) =>
    selectAllProductsById(state)
  );
  const allProducts = useMemo(() => {
    return Object.values(allProductsById);
  }, [allProductsById]);
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) =>
      product.name?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [allProducts, searchText]);

  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductItem item={item} />
  );

  return (
    <View style={styles.container}>
      <View>
        <SafeAreaView>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.resultsHeader}>
              Search results for "{searchText}" ({filteredProducts.length})
            </Text>
          </View>
        </SafeAreaView>
      </View>

      {filteredProducts.length === 0 ? (
        <View style={styles.noResults}>
          <FontAwesome name="search" size={48} color="#ccc" />
          <Text style={styles.noResultsText}>No products found</Text>
          <Text style={styles.noResultsSubtext}>
            Try a different search term
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.productId}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  resultsHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  listContainer: {},
  productCard: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e74c3c",
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
  tagIcon: {
    marginHorizontal: 2,
  },
  moreTags: {
    fontSize: 12,
    color: "#666",
    alignSelf: "center",
  },
  noResults: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    color: "#333",
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
});

export default Search;
