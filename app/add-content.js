import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

export default function AddContent() {
  const [link, setLink] = useState("");
  const [photo, setPhoto] = useState(null);
  const router = useRouter();

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "You need to grant camera roll access."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!link && !photo) {
      Alert.alert("Error", "Please provide a link or upload a photo.");
      return;
    }

    // Save the content to the "Memories" tab
    const newMemory = {
      id: Date.now().toString(),
      uri: photo || link,
      timestamp: new Date().toISOString(),
      location: "Unknown Location",
      sharedWith: [],
    };

    // Pass the new memory back to the "Memories" tab
    router.push({
      pathname: "/(tabs)",
      params: { newMemory: JSON.stringify(newMemory) },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Content</Text>

      {/* Input Link */}
      <TextInput
        style={styles.input}
        placeholder="Enter a link"
        value={link}
        onChangeText={setLink}
      />

      {/* Upload Photo */}
      <Button title="Upload Photo" onPress={handlePickImage} />
      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      {/* Save Button */}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
