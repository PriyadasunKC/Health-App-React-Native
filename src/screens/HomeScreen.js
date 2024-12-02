import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useClickCount } from "../contexts/ClickCountContext";
import { Header } from "../components/Header";
import { HealthCard } from "../components/HealthCard";
import { FloatingCounter } from "../components/FloatingCounter";
import { fetchHealthyRecipes } from "../services/api";
import { getFallbackData } from "../services/mockData";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { clickCount, incrementCount } = useClickCount();
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHealthData();
  }, []);

  const loadHealthData = async () => {
    try {
      const data = await fetchHealthyRecipes();
      setHealthData(data);
      setError(null);
    } catch (error) {
      console.error("Error loading health data:", error);
      setError("Failed to load health data");
      setHealthData(getFallbackData());
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (item) => {
    incrementCount();
  };

  const handleLogout = () => {
    logout();
    navigation.replace("Login");
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadHealthData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header user={user} onLogout={handleLogout} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Healthy Recipes</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading healthy recipes...</Text>
          </View>
        ) : (
          healthData.map((item) => (
            <HealthCard key={item.id} item={item} onPress={handleCardClick} />
          ))
        )}
      </ScrollView>

      <FloatingCounter count={clickCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#ff6b6b",
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: "#0782F9",
    padding: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "500",
  },
});
