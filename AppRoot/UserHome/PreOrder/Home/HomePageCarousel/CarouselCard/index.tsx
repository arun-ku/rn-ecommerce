import { FC } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CarouselData } from "../../../../../../models/home/carouselData";

interface CarouselCardProps {
  data: CarouselData;
}

const { width } = Dimensions.get("window");

const CarouselCard: FC<CarouselCardProps> = ({ data }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500)}>
      <View style={[styles.cardContainer, { backgroundColor: data.bgColor }]}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={data.image}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: data.textColor }]}>
            {data.title}
          </Text>
          <Text style={[styles.subTitle, { color: data.textColor }]}>
            {data.subTitle}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width - 40,
    height: 180,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: "100%",
    overflow: "hidden",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    width: "65%",
    height: "100%",
    justifyContent: "flex-start",
    marginTop: 30,
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subTitle: {
    marginTop: 4,
  },
});

export default CarouselCard;
