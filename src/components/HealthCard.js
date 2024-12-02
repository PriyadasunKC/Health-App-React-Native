// src/components/HealthCard.js
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const HealthCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.healthCard} onPress={() => onPress(item)}>
    <Image
      source={{ uri: item.image }}
      style={styles.cardImage}
      defaultSource={require("../../assets/health.jpeg")}
    />
    <View style={styles.cardContent}>
      <View
        style={[
          styles.statusTag,
          {
            backgroundColor:
              item.status === "Vegan"
                ? "#e6ffe6"
                : item.status === "Vegetarian"
                ? "#fff2e6"
                : "#e6f3ff",
          },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            {
              color:
                item.status === "Vegan"
                  ? "#2e8b57"
                  : item.status === "Vegetarian"
                  ? "#ff8c00"
                  : "#0782F9",
            },
          ]}
        >
          {item.status}
        </Text>
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Icon name="fire" size={16} color="#ff6b6b" />
        <Text style={styles.caloriesText}>{item.calories} calories</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  healthCard: {
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 15,
  },
  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  caloriesText: {
    marginLeft: 4,
    color: "#666",
    fontSize: 14,
  },
});

