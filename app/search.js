import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  View,
  Image,
  Dimensions,
} from "react-native";

const photos = [
  {
    id: "1",
    uri: "https://tse1.mm.bing.net/th/id/OIP.p-tniObOQQvGRilOubxWxgHaMF?w=474&h=474&c=7g",
    timestamp: "2025-04-28 10:00 AM",
    location: "Raleigh, NC",
    sharedWith: ["Alice", "Bob"],
  },
  {
    id: "2",
    uri: "https://images.pexels.com/photos/2446439/pexels-photo-2446439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    timestamp: "2025-04-27 2:30 PM",
    location: "San Francisco, CA",
    sharedWith: ["Charlie"],
  },
  {
    id: "3",
    uri: "https://images.pexels.com/photos/26600256/pexels-photo-26600256/free-photo-of-memorial-church-in-stanford-in-the-usa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    timestamp: "2025-04-27 2:30 PM",
    location: "Palo Alto, CA",
    sharedWith: ["Charlie"],
  },
];

const screenWidth = Dimensions.get("window").width;
const numColumns = 3;
const photoSize = screenWidth / numColumns - 10;

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPhotos = photos.filter((photo) =>
    photo.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPhoto = ({ item }) => (
    <View style={styles.photoContainer}>
      <Image source={{ uri: item.uri }} style={styles.photo} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search photos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredPhotos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
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
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  grid: {
    padding: 5,
  },
  photoContainer: {
    flex: 1,
    margin: 2,
    alignItems: "center",
  },
  photo: {
    width: photoSize,
    height: photoSize,
    borderRadius: 10,
  },
});
