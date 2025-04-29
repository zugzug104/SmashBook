import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function AddContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the new screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
