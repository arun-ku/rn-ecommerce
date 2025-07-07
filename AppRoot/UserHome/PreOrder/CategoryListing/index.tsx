import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import ProductListing from "../../../../components/ProductListing";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { selectProductsByCategory } from "../../../../redux/slices/productSlice";
import { useCallback, useMemo } from "react";
import { FontAwesome } from "@expo/vector-icons";

import categories from "../../../../constants/mockData/categories";

const CategoryListing = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId } = route.params as { categoryId: string };

  const products = useSelector((state: RootState) =>
    selectProductsByCategory(state, `${categoryId}`)
  );

  const categoryName = useMemo(() => {
    return categories.find((category) => category.id === categoryId)?.title;
  }, [categoryId]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.backButton}
            >
              <FontAwesome name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {categoryName} ({products.length})
            </Text>
          </View>
        </SafeAreaView>
      </View>
      <ProductListing products={products} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#3498db",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CategoryListing;
