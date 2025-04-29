import React from "react";
import { StyleSheet, FlatList, Image, View, Dimensions } from "react-native";

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
  const renderPhoto = ({ item }: { item: (typeof photos)[0] }) => (
    <View style={styles.photoContainer}>
      <Image source={{ uri: item.uri }} style={styles.photo} />
    </View>
  );

  return (
    <View style={styles.container}>
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
