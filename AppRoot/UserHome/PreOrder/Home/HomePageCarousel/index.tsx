import {
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import homePromotionalData from "../../../../../constants/mockData/homePromotionalData";
import CarouselCard from "./CarouselCard";
import { useCallback, useRef } from "react";
import Pagination from "./Pagination";

const HomePageCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: false,
      })(event);
    },
    []
  );

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={homePromotionalData}
        renderItem={({ item }) => <CarouselCard data={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text>No items found</Text>
          </View>
        )}
        onScroll={handleScroll}
      />
      <Pagination data={homePromotionalData} scrollX={scrollX} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  carouselContainer: {
    width: "100%",
    paddingVertical: 10,
    position: "relative",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomePageCarousel;
