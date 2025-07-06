import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const Profile = () => {
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    memberSince: "June 2020",
    orderCount: 12,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with user info */}
      <View style={styles.header}>
        <SafeAreaView style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.memberSince}>
              Member since {user.memberSince}
            </Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Stats section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.orderCount}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Wishlist</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      {/* Account section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Account</Text>
        {[
          "Personal Information",
          "My Orders",
          "Shipping Addresses",
          "Payment Methods",
          "My Reviews",
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.sectionItem}>
            <Text style={styles.sectionTitle}>{item}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Preferences section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Preferences</Text>
        {["Notifications", "App Settings", "Help Center"].map((item, index) => (
          <TouchableOpacity key={index} style={styles.sectionItem}>
            <Text style={styles.sectionTitle}>{item}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  memberSince: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#eee",
    height: "80%",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    marginBottom: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#f8f8f8",
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 16,
    color: "#333",
  },
  chevron: {
    fontSize: 18,
    color: "#ccc",
  },
  logoutButton: {
    marginVertical: 20,
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#ff3b30",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Profile;
