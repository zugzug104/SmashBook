import React from "react";
import {
  StyleSheet,
  SectionList,
  Image,
  View,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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

function parseTimestampToDateLabel(timestamp) {
  const dateOnly = timestamp.split(" ")[0];
  const [year, month, day] = dateOnly.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  if (isNaN(dateObj.getTime())) {
    console.error("Invalid parsed date:", timestamp);
    return "Unknown Date";
  }
  return dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function getSpotifyEmbedUrl(dateLabel) {
  if (dateLabel.includes("Apr 28")) {
    return "https://open.spotify.com/embed/track/2fRoKHW3lzNUKIUTade8nL"; // 745
  } else if (dateLabel.includes("Apr 27")) {
    return "https://open.spotify.com/embed/track/0I3q5fE6wg7LIfHGngUTnV"; // Someone to Call My Lover
  }
  return null;
}

function groupPhotosByDate(photos) {
  const groups = {};
  photos.forEach((photo) => {
    const dateKey = parseTimestampToDateLabel(photo.timestamp);
    if (!groups[dateKey]) {
      groups[dateKey] = {
        title: dateKey,
        data: [],
        spotifyEmbedUrl: getSpotifyEmbedUrl(dateKey),
      };
    }
    groups[dateKey].data.push(photo);
  });
  return Object.values(groups);
}

const screenWidth = Dimensions.get("window").width;
const photoSize = screenWidth - 20;

export default function TabOneScreen() {
  const [currentDate, setCurrentDate] = React.useState(
    parseTimestampToDateLabel(photos[0].timestamp)
  );
  const router = useRouter();
  const sections = React.useMemo(() => groupPhotosByDate(photos), []);

  const onViewRef = React.useRef(({ viewableItems }) => {
    const firstVisible = viewableItems.find((item) => item.section);
    if (firstVisible?.section?.title) {
      setCurrentDate(firstVisible.section.title);
    }
  });

  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const renderPhoto = ({ item }) => (
    <View style={styles.photoContainer}>
      <Image source={{ uri: item.uri }} style={styles.photo} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.profileButton}
          onPress={() => router.push("/profile")}
        >
          <FontAwesome name="user" size={20} color="#fff" />
        </Pressable>
        <Pressable
          style={styles.searchButton}
          onPress={() => router.push("/search")}
        >
          <FontAwesome name="search" size={20} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.date}>{currentDate}</Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderPhoto({ item })}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeaderWrapper}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>
            {section.spotifyEmbedUrl && (
              <View style={styles.spotifyContainer}>
                <WebView
                  source={{ uri: section.spotifyEmbedUrl }}
                  style={styles.spotifyPlayer}
                  allowsInlineMediaPlayback
                  mediaPlaybackRequiresUserAction={false}
                  scrollEnabled={false}
                />
              </View>
            )}
          </View>
        )}
        stickySectionHeadersEnabled={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* Floating Circle Button */}
      <Pressable
        style={styles.floatingButton}
        onPress={() => router.push("/add-content")} // Navigate to the new screen
      >
        <FontAwesome name="plus" size={24} color="#fff" />
      </Pressable>
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
  dateContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  today: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  sectionHeaderWrapper: {
    backgroundColor: "#fff",
    paddingBottom: 5,
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  sectionHeaderText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  spotifyContainer: {
    height: 100,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#000",
    marginBottom: 10,
  },
  spotifyPlayer: {
    flex: 1,
  },
  photoContainer: {
    padding: 10,
  },
  photo: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
