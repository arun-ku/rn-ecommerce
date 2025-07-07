import { Text, View } from "react-native";
import { Tag } from "../../../../../../models/product/product";
import { FontAwesome } from "@expo/vector-icons";

const ProductTag = ({ item }: { item: Tag }) => (
  <View style={[styles.tag, { backgroundColor: item.bgColor || "#f0f0f0" }]}>
    {item.prefixIcon && (
      <FontAwesome
        name={item.prefixIcon as any}
        size={14}
        color={item.prefixIconColor || "#000"}
        style={styles.tagIcon}
      />
    )}
    <Text style={[styles.tagText, { color: item.textColor || "#000" }]}>
      {item.label}
    </Text>
    {item.postfixIcon && (
      <FontAwesome
        name={item.postfixIcon as any}
        size={14}
        color={item.postFixIconColor || "#000"}
        style={styles.tagIcon}
      />
    )}
  </View>
);

const styles = {
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagIcon: {
    marginRight: 4,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
  },
};

export default ProductTag;
