import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import categories from "../../../../../constants/mockData/categories";
import Animated, { SlideInRight } from "react-native-reanimated";

interface CategoryNavigationProps {
  handleCategorySelect: (categoryId: string) => void;
  selectedCategory: string;
}

const CategoryNavigation = ({
  handleCategorySelect,
  selectedCategory,
}: CategoryNavigationProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.itemContainer,
              index === categories.length - 1
                ? styles.lastItem
                : styles.notLastItem,
            ]}
          >
            <Animated.View
              entering={SlideInRight.delay(index * 50).duration(300)}
              style={styles.animatedContainer}
            >
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => handleCategorySelect(item.id)}
              >
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={24}
                    color={selectedCategory === item.id ? "#3498db" : "#888"}
                  />
                </View>
                <Text
                  style={[
                    styles.itemText,
                    selectedCategory === item.id ? { fontWeight: "bold" } : {},
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    alignItems: "center",
  },
  lastItem: {
    marginRight: 0,
  },
  notLastItem: {
    marginRight: 4,
  },
  animatedContainer: {
    borderRadius: 10,
    width: 75,
  },
  touchable: {
    alignItems: "center",
  },
  iconContainer: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
  },
  itemText: {
    marginTop: 8,
  },
});

export default CategoryNavigation;
