import { Animated, View } from "react-native";

const HEADER_HEIGHT = 500;

interface HeaderProps {
  images: string[];
  scrollY: Animated.Value;
}

const Header = ({ images, scrollY }: HeaderProps) => {
  return (
    <View
      style={{
        alignItems: "center",
        overflow: "hidden",
        marginTop: -1000,
        paddingTop: 1000,
      }}
    >
      <Animated.Image
        source={{ uri: images[0] }}
        style={{
          width: "200%",
          height: HEADER_HEIGHT,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
              }),
            },
            {
              scale: scrollY.interpolate({
                inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                outputRange: [2, 1, 0.75],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
        resizeMode="cover"
      />
    </View>
  );
};
export default Header;
