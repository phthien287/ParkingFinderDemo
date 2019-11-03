import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Map from "./screens/Map";

export default function App() {
  return <Map></Map>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
