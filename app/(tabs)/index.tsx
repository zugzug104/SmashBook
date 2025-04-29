import React from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icons
import { useRouter } from "expo-router"; // Import the router for navigation

const photos = [
  {
    id: "1",
    uri: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Young_girl_smiling_in_sunshine_%282%29.jpg",
    timestamp: "2025-04-28 10:00 AM",
    location: "Stanford, CA",
    sharedWith: ["Alice", "Bob"],
  },
  {
    id: "2",
    uri: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Young_girl_smiling_in_sunshine_%282%29.jpg",
    timestamp: "2025-04-27 2:30 PM",
    location: "Palo Alto, CA",
    sharedWith: ["Charlie"],
  },
  {
    id: "3",
    uri: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Young_girl_smiling_in_sunshine_%282%29.jpg",
    timestamp: "2025-04-27 2:30 PM",
    location: "Palo Alto, CA",
    sharedWith: ["Charlie"],
  },
];

const screenWidth = Dimensions.get("window").width; // Get screen width
const numColumns = 3; // Number of columns
const photoSize = screenWidth / numColumns - 10; // Calculate dynamic size with spacing

export default function TabOneScreen() {
  const router = useRouter(); // Initialize the router

  const renderPhoto = ({ item }) => (
    <View style={styles.photoContainer}>
      <Image source={{ uri: item.uri }} style={styles.photo} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Profile and Search Buttons */}
      <View style={styles.header}>
        <Pressable
          style={styles.profileButton}
          onPress={() => console.log("Profile button pressed")}
        >
          <FontAwesome name="user" size={20} color="#fff" />
        </Pressable>
        <Pressable
          style={styles.searchButton}
          onPress={() => router.push("/search")} // Navigate to the search screen
        >
          <FontAwesome name="search" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* Image Grid */}
      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id}
        numColumns={numColumns} // Display photos in a grid with 3 columns
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    padding: 5, // Add padding for the grid
  },
  photoContainer: {
    flex: 1,
    margin: 2, // Add small margin between photos
    alignItems: "center",
  },
  photo: {
    width: photoSize, // Dynamic width based on screen size
    height: photoSize, // Dynamic height to maintain square shape
    borderRadius: 10,
  },
});
