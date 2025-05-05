import React from "react";
import { StyleSheet, View, Text, Image, Pressable, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/lib/supabase/authContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={32} color="#007AFF" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  backText: {
    fontSize: 17,
    color: "#007AFF",
    marginLeft: 4,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  logoutText: {
    fontSize: 17,
    color: "#FF3B30",
    marginLeft: 4,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
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
    gap: 20,
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
