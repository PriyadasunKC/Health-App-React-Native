// src/components/FloatingCounter.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const FloatingCounter = ({ count }) => (
  <TouchableOpacity style={styles.floatingButton}>
    <Icon name="hand-pointing-up" size={24} color="white" />
    <Text style={styles.floatingButtonText}>Clicks: {count}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#0782F9",
    padding: 15,
    borderRadius: 25,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  floatingButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
});
