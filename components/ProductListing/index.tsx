import { FC, useCallback, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProductCard from "./ProductCard";

import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  CategoryListing: { categoryId: string };
};

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "CategoryListing"
>;

interface ProductListingProps {
  products: string[];
  showHeader?: boolean;
  limit?: number;
  categoryId?: string;
}

const ProductListing: FC<ProductListingProps> = ({
  products = [],
  showHeader,
  limit,
  categoryId,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const displayProducts = useMemo(() => {
    if (limit && products.length > limit) {
      return products?.slice(0, limit) || [];
    }

    return products;
  }, [products, limit]);

  const handleSeeAllPress = useCallback(() => {
    if (categoryId) {
      navigation.navigate("CategoryListing", { categoryId });
    } else {
      navigation.navigate("CategoryListing", { categoryId: "all" });
    }
  }, [categoryId, navigation]);

  return (
    <View style={!limit ? styles.containerWithOutLimit : styles.container}>
      {showHeader && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Featured Products</Text>
          <TouchableOpacity
            onPress={handleSeeAllPress}
            style={styles.seeAllButton}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
      )}
      {limit ? (
        displayProducts?.map((item, index) => (
          <ProductCard key={item} productId={item} index={index} />
        ))
      ) : (
        <FlatList
          data={displayProducts}
          renderItem={({ item, index }) => (
            <ProductCard productId={item} index={index} />
          )}
          keyExtractor={(item) => item}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />
      )}
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
  containerWithOutLimit: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerContainer: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  seeAllButton: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  seeAllText: {
    color: "#888",
    fontSize: 16,
    fontWeight: "600",
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default ProductListing;
