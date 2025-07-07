import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import HomePageCarousel from "./HomePageCarousel";
import CategoryNavigation from "./CategoryNavigation";
import ProductListing from "../../../../components/ProductListing";
import ProductService from "../../../../services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsSuccess,
  selectAllProducts,
  selectAllProductsById,
  selectProductsByCategory,
} from "../../../../redux/slices/productSlice";
import { CATEGORY_IDS } from "../../../../constants/mockData/categories";
import { RootState } from "../../../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../../../../models/product/product";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  ProductDescription: { productId: string };
  Search: { searchText: string };
  Notifications: undefined;
};

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductDescription" | "Search" | "Notifications"
>;

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_IDS.ALL);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<View | null>(null);
  const searchInputRef = useRef<View | null>(null);
  const textInputRef = useRef<TextInput>(null);

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) =>
    selectProductsByCategory(state, `${selectedCategory}`)
  );
  const allProductsById = useSelector((state: RootState) =>
    selectAllProductsById(state)
  );
  const allProducts = useMemo(() => {
    return Object.values(allProductsById);
  }, [allProductsById]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await ProductService.getAllProducts();
      dispatch(fetchProductsSuccess(response));
    };
    fetchProducts();
  }, [dispatch]);

  // Since React Native doesn't have document or contains method,
  // we'll use TouchableWithoutFeedback to handle touches outside
  // The TouchableWithoutFeedback in the main container will handle this

  useEffect(() => {
    // No need for document event listeners in React Native
    // The touch handling is done via TouchableWithoutFeedback
  }, [showSuggestions]);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchText(text);
      if (text.length > 0) {
        const filteredSuggestions = allProducts
          .filter((product) =>
            product.name?.toLowerCase().includes(text.toLowerCase())
          )
          .slice(0, 5); // Limit to 5 suggestions

        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    },
    [allProducts]
  );

  const handleSelectSuggestion = useCallback(
    (suggestion: Product) => {
      setSearchText(suggestion.name || "");
      setShowSuggestions(false);
      navigation.navigate("ProductDescription", {
        productId: suggestion.productId,
      });
    },
    [navigation]
  );

  const handleSearch = useCallback(() => {
    if (searchText.trim()) {
      setShowSuggestions(false);
      // Navigate to search results page
      navigation.navigate("Search", { searchText: searchText });
    }
  }, [searchText, navigation]);

  const handleOutsidePress = useCallback(() => {
    textInputRef.current?.blur();
    setShowSuggestions(false);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.inputContainer} ref={searchInputRef}>
              <View style={styles.inputIconContainer}>
                <FontAwesome name="search" size={20} color="#888" />
              </View>
              <TextInput
                ref={textInputRef}
                placeholder="Search"
                style={styles.searchInput}
                value={searchText}
                onChangeText={handleSearchChange}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                onFocus={() => {
                  if (searchText.length > 0 && suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
              />
              {searchText.length > 0 && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    setSearchText("");
                    setShowSuggestions(false);
                  }}
                >
                  <FontAwesome name="times-circle" size={16} color="#888" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.notificationIconContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")}
                style={styles.notificationButton}
              >
                <FontAwesome name="bell-o" size={20} color="#888" />
              </TouchableOpacity>
            </View>
          </View>

          {showSuggestions && suggestions.length > 0 && (
            <View style={styles.suggestionsContainer} ref={suggestionsRef}>
              <FlatList
                data={suggestions}
                keyExtractor={(item) => item.productId?.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => handleSelectSuggestion(item)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <ScrollView>
            <HomePageCarousel />
            <CategoryNavigation
              handleCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
            <ProductListing
              products={products}
              showHeader
              categoryId={selectedCategory}
              limit={6}
            />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
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
  clearButton: {
    position: "absolute",
    right: 12,
    top: 12,
    zIndex: 1,
  },
  suggestionsContainer: {
    position: "absolute",
    top: 60,
    left: 10,
    right: 60,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 1000,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
});

export default Home;
