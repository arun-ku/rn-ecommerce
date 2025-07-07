import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ITEM_HEIGHT = 98;

// Mock notification types
type NotificationType =
  | "order_shipped"
  | "order_delivered"
  | "price_drop"
  | "back_in_stock"
  | "promo"
  | "cart_reminder"
  | "new_arrival"
  | "review_request";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  image?: string;
}

const generateMockNotifications = (): Notification[] => {
  const types: NotificationType[] = [
    "order_shipped",
    "order_delivered",
    "price_drop",
    "back_in_stock",
    "promo",
    "cart_reminder",
    "new_arrival",
    "review_request",
  ];

  const timeframes = [
    "Just now",
    "5 mins ago",
    "15 mins ago",
    "30 mins ago",
    "1 hour ago",
    "2 hours ago",
    "3 hours ago",
    "Yesterday",
    "2 days ago",
    "3 days ago",
    "5 days ago",
  ];

  const productImages = [
    "https://via.placeholder.com/50",
    "https://via.placeholder.com/50/FF5733",
    "https://via.placeholder.com/50/33FF57",
    "https://via.placeholder.com/50/5733FF",
    "https://via.placeholder.com/50/FFFF33",
  ];

  const notifications: Notification[] = [];

  for (let i = 0; i < 25; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    let title = "";
    let message = "";

    switch (type) {
      case "order_shipped":
        title = "Order Shipped";
        message = `Your order #${
          10000 + i
        } has been shipped and is on its way!`;
        break;
      case "order_delivered":
        title = "Order Delivered";
        message = `Your order #${
          10000 + i
        } has been delivered. Enjoy your purchase!`;
        break;
      case "price_drop":
        title = "Price Drop Alert";
        message = `An item in your wishlist is now ${
          Math.floor(Math.random() * 40) + 10
        }% off!`;
        break;
      case "back_in_stock":
        title = "Back in Stock";
        message = "An item you were interested in is back in stock!";
        break;
      case "promo":
        title = "Special Offer";
        message = `Use code SAVE${Math.floor(Math.random() * 50)} for ${
          Math.floor(Math.random() * 30) + 10
        }% off your next purchase!`;
        break;
      case "cart_reminder":
        title = "Items in Cart";
        message = "You left items in your cart. Complete your purchase now!";
        break;
      case "new_arrival":
        title = "New Arrivals";
        message = "Check out the latest products in our store!";
        break;
      case "review_request":
        title = "Review Request";
        message = "How would you rate your recent purchase?";
        break;
    }

    notifications.push({
      id: `notification-${i}`,
      type,
      title,
      message,
      time: timeframes[Math.floor(Math.random() * timeframes.length)],
      isRead: Math.random() > 0.3,
      image: productImages[Math.floor(Math.random() * productImages.length)],
    });
  }

  return notifications;
};

const Notifications = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [notifications, setNotifications] = useState<Notification[]>(
    generateMockNotifications()
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case "order_shipped":
        return "cube";
      case "order_delivered":
        return "checkmark-circle";
      case "price_drop":
        return "pricetag";
      case "back_in_stock":
        return "refresh-circle";
      case "promo":
        return "gift";
      case "cart_reminder":
        return "cart";
      case "new_arrival":
        return "star";
      case "review_request":
        return "chatbubbles";
      default:
        return "notifications";
    }
  };

  const renderNotificationItem = ({
    item,
    index,
  }: {
    item: Notification;
    index: number;
  }) => (
    <Animated.View
      style={{
        opacity: scrollY.interpolate({
          inputRange: [-1, 0, ITEM_HEIGHT * index, ITEM_HEIGHT * (index + 1)],
          outputRange: [1, 1, 1, 0],
        }),
        transform: [
          {
            scale: scrollY.interpolate({
              inputRange: [
                -1,
                0,
                ITEM_HEIGHT * index,
                ITEM_HEIGHT * (index + 2),
              ],
              outputRange: [1, 1, 1, 0],
            }),
          },
        ],
      }}
    >
      <TouchableOpacity
        style={[styles.notificationItem, !item.isRead && styles.unreadItem]}
        onPress={() => markAsRead(item.id)}
      >
        <View style={styles.notificationIconContainer}>
          <Ionicons
            name={getIconForType(item.type)}
            size={24}
            color="#3498db"
          />
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
          <Text style={styles.notificationMessage}>{item.message}</Text>
        </View>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.productImage} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity>
              <Ionicons
                name="arrow-back"
                size={24}
                color="#fff"
                onPress={handleBackPress}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notifications</Text>
          </View>
        </SafeAreaView>
      </View>

      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    backgroundColor: "#3498db",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  listContainer: {
    padding: 8,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 4,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
    height: ITEM_HEIGHT - 8,
  },
  unreadItem: {
    backgroundColor: "#e6f7ff",
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  notificationTime: {
    fontSize: 12,
    color: "#999",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default Notifications;
