// src/components/Header.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const Header = ({ user, onLogout }) => (
  <View style={styles.header}>
    <View style={styles.headerTop}>
      <View>
        <Text style={styles.headerTitle}>Health Dashboard</Text>
        <Text style={styles.headerEmail}>{user?.email}</Text>
      </View>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Icon name="logout" size={24} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0782F9",
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerEmail: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
  },
  logoutButton: {
    padding: 8,
  },
});
