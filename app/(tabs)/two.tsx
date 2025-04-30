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
    title: "2010!!!",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/2010s_collage_v21.png",
  },
  {
    id: "2",
    title: "Raleigh Summer",
    image: "https://tse1.mm.bing.net/th/id/OIP.p-tniObOQQvGRilOubxWxgHaMF?w=474&h=474&c=7",
  },
  {
    id: "3",
    title: "Last November",
    image: "https://images.pexels.com/photos/3933404/pexels-photo-3933404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "4",
    title: "Stanford",
    image: "https://images.pexels.com/photos/26600256/pexels-photo-26600256/free-photo-of-memorial-church-in-stanford-in-the-usa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
