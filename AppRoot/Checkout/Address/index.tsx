import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Address = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Delivery Address</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.addressContent}>
        <Text style={styles.addressLine}>123 Main Street</Text>
        <Text style={styles.addressLine}>New York, NY 10001</Text>
        <Text style={styles.addressLine}>United States</Text>
        <Text style={styles.highlightedText}>Apartment 4B</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.contactInfo}>
        <Text style={styles.contactText}>📞 +1 (212) 555-7890</Text>
        <Text style={styles.contactText}>✉️ johndoe@example.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 10,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  editButton: {
    padding: 6,
  },
  editButtonText: {
    color: "#3498db",
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
  },
  addressContent: {
    marginVertical: 6,
  },
  addressLine: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    lineHeight: 20,
  },
  highlightedText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginBottom: 6,
  },
  contactInfo: {
    marginTop: 6,
  },
  contactText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
});

export default Address;
