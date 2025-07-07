import { View, Text, StyleSheet } from "react-native";

const Wishlist = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>🚧</Text>
        </View>
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.subtitle}>
          Wishlist feature is under development
        </Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            We're working hard to bring you a place to save all your favorite
            products. Check back soon!
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 16,
  },
  iconText: {
    fontSize: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  progressBar: {
    height: 6,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    marginBottom: 24,
  },
  progressFill: {
    height: 6,
    width: "65%",
    backgroundColor: "#4A90E2",
    borderRadius: 3,
  },
  infoContainer: {
    paddingHorizontal: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#777",
    textAlign: "center",
  },
});

export default Wishlist;
