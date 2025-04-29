import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  Text,
  Dimensions,
} from "react-native";

const boards = [
  {
    id: "1",
    title: "Trip to Tahoe",
    image: "https://via.placeholder.com/300x400",
  },
  {
    id: "2",
    title: "Memories with Chelsea",
    image: "https://via.placeholder.com/300x500",
  },
  {
    id: "3",
    title: "Last November",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: "4",
    title: "Stanford",
    image: "https://via.placeholder.com/300x450",
  },
  {
    id: "5",
    title: "Memories with Emily",
    image: "https://via.placeholder.com/300x350",
  },
];

const screenWidth = Dimensions.get("window").width;
const columnWidth = screenWidth / 2 - 15; // Two columns with spacing

export default function BoardsScreen() {
  const renderBoard = ({ item }: { item: (typeof boards)[0] }) => (
    <View style={styles.boardContainer}>
      <Image source={{ uri: item.image }} style={styles.boardImage} />
      <Text style={styles.boardTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={boards}
        renderItem={renderBoard}
        keyExtractor={(item) => item.id}
        numColumns={2} // Two columns for the grid
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
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  boardContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    overflow: "hidden",
  },
  boardImage: {
    width: columnWidth,
    height: columnWidth * 1.5, // Adjust height for a Pinterest-style look
    resizeMode: "cover",
  },
  boardTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
