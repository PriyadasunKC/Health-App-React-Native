import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useClickCount } from "../contexts/ClickCountContext";
import { Header } from "../components/Header";
import { HealthCard } from "../components/HealthCard";
import { MealTracker } from "../components/MealTracker";
import { FloatingCounter } from "../components/FloatingCounter";
import WorldHealthDashboard from "../components/WorldHealthDashboard"; // Changed from named to default import
import { fetchHealthyRecipes } from "../services/api";
import { getFallbackData } from "../services/mockData";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { clickCount, incrementCount } = useClickCount();
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const recipesData = await fetchHealthyRecipes();
      setHealthData(recipesData);
      setError(null);
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load data");
      setHealthData(getFallbackData());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCardClick = (item) => {
    incrementCount();
  };

  const handleLogout = () => {
    logout();
    navigation.replace("Login");
  };

  const onRefresh = () => {
    loadData(true);
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header user={user} onLogout={handleLogout} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => loadData()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header user={user} onLogout={handleLogout} />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0782F9" />
            <Text style={styles.loadingText}>Loading data...</Text>
          </View>
        ) : (
          <>
            <WorldHealthDashboard />

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Track Your Meals</Text>
              <MealTracker />
            </View>

            <View style={styles.recipesSection}>
              <Text style={styles.sectionTitle}>Healthy Recipes</Text>
              <View style={styles.cardContainer}>
                {healthData.map((item) => (
                  <HealthCard
                    key={item.id}
                    item={item}
                    onPress={handleCardClick}
                  />
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>

      <FloatingCounter count={clickCount} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
  sectionContainer: {
    padding: 20,
    paddingBottom: 0,
  },
  recipesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  cardContainer: {
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 200,
  },
  loadingText: {
    marginTop: 10,
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
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#0782F9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "500",
  },
});
