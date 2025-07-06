import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { CarouselData } from "../../../../../../models/home/carouselData";
import { FC } from "react";

interface PaginationProps {
  data: CarouselData[];
  scrollX: Animated.Value;
}

const { width } = Dimensions.get("window");

const Pagination: FC<PaginationProps> = ({ data, scrollX }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        {data.map((item, index) => (
          <Animated.View
            key={item.id}
            style={[
              styles.dot,
              {
                width: scrollX.interpolate({
                  inputRange: [
                    (index - 1) * (width - 20),
                    index * (width - 20),
                    (index + 1) * (width - 20),
                  ],
                  outputRange: [10, 30, 10],
                  extrapolate: "clamp",
                }),
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    bottom: 30,
    width: "100%",
    justifyContent: "center",
  },
  dotsContainer: {
    flexDirection: "row",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ecf0f1",
    margin: 5,
    alignSelf: "center",
  },
});

export default Pagination;
