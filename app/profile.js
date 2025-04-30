import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/6706847/pexels-photo-6706847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.welcomeText}>Welcome, Lauren</Text>

      <View style={styles.statsRow}>
        <Text style={styles.statItem}>
          <Text style={styles.statLabel}>Friends </Text>
          <Text style={styles.statCount}>3</Text>
        </Text>
        <Text style={styles.statItem}>
          <Text style={styles.statLabel}>Boards </Text>
          <Text style={styles.statCount}>4</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    gap: 20, // Works in React Native 0.71+; use marginRight for older versions
  },
  statItem: {
    fontSize: 16,
  },
  statLabel: {
    color: "#000",
    fontWeight: "600",
  },
  statCount: {
    color: "#888",
    fontWeight: "400",
  },
});
