import { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import HomePageCarousel from "./HomePageCarousel";
import CategoryNavigation from "./CategoryNavigation";
import ProductListing from "./ProductListing";
import dresses from "../../../../constants/mockData/productData/dresses";
import ProductService from "../../../../services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsSuccess,
  selectProductsByCategory,
} from "../../../../redux/slices/productSlice";
import { CATEGORY_IDS } from "../../../../constants/mockData/categories";
import { RootState } from "../../../../redux/store";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_IDS.ALL);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) =>
    selectProductsByCategory(state, `${selectedCategory}`)
  );
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await ProductService.getAllProducts();

      dispatch(fetchProductsSuccess(response));
    };
    fetchProducts();
  }, [dispatch]);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, [])

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <FontAwesome name="search" size={20} color="#888" />
            </View>
            <TextInput placeholder="Search" style={styles.searchInput} />
          </View>
          <View style={styles.notificationIconContainer}>
            <TouchableOpacity
              onPress={() => alert("Notification clicked!")}
              style={styles.notificationButton}
            >
              <FontAwesome name="bell-o" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <HomePageCarousel />
          <CategoryNavigation handleCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
          <ProductListing products={products} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: "#f8f8f8" },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  inputIconContainer: {
    position: "absolute",
    left: 12,
    top: 9,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 40,
    backgroundColor: "#e5e5e5",
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#e5e5e5",
  },
});

export default Home;
