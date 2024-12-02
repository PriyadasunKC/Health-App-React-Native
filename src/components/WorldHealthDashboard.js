import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WorldHealthDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [healthData, setHealthData] = useState(null);
  const [error, setError] = useState(null);

  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 60; // Adjusted for container padding

  const fetchWHOData = async () => {
    try {
      const processedData = {
        foodborneDisease: {
          total: "600M",
          annualDeaths: "420K",
          childrenAffected: "125M",
          preventionRate: "68%",
        },
        recentOutbreaks: [
          { month: "Jan", cases: 65 },
          { month: "Feb", cases: 59 },
          { month: "Mar", cases: 80 },
          { month: "Apr", cases: 71 },
          { month: "May", cases: 56 },
          { month: "Jun", cases: 55 },
        ],
        foodSafetyStats: {
          globalAccess: "73%",
          qualityStandards: "82%",
          riskAssessment: "65%",
        },
      };

      setHealthData(processedData);
    } catch (err) {
      setError("Failed to fetch health data");
      console.error("Data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWHOData();
  }, []);

  const renderStatCard = (title, value, icon, color, subtitle) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <View
          style={[styles.iconBackground, { backgroundColor: `${color}15` }]}
        >
          <Icon name={icon} size={24} color={color} />
        </View>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0782F9" />
        <Text style={styles.loadingText}>Loading global health data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle" size={40} color="#e74c3c" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Global Food Safety Monitor</Text>
        <Text style={styles.subtitle}>WHO Food Safety Statistics</Text>
      </View>

      <View style={styles.statsGrid}>
        {renderStatCard(
          "Annual Foodborne Illnesses",
          healthData.foodborneDisease.total,
          "food-apple-outline",
          "#e74c3c",
          "Globally reported cases"
        )}
        {renderStatCard(
          "Annual Deaths",
          healthData.foodborneDisease.annualDeaths,
          "hospital-box",
          "#c0392b",
          "Due to foodborne diseases"
        )}
        {renderStatCard(
          "Children Under 5",
          healthData.foodborneDisease.childrenAffected,
          "account-child",
          "#f39c12",
          "Affected annually"
        )}
        {renderStatCard(
          "Prevention Rate",
          healthData.foodborneDisease.preventionRate,
          "shield-check",
          "#27ae60",
          "Through food safety measures"
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 5,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconBackground: {
    padding: 8,
    borderRadius: 10,
    marginRight: 8,
  },
  statTitle: {
    fontSize: 12,
    color: "#95a5a6",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 11,
    color: "#95a5a6",
  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 15,
  },
  chart: {
    borderRadius: 16,
    marginRight: -15, // Compensate for right padding
    marginLeft: -15, // Compensate for left padding
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  loadingText: {
    marginTop: 10,
    color: "#7f8c8d",
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  errorText: {
    marginTop: 10,
    color: "#e74c3c",
    textAlign: "center",
  },
});

export default WorldHealthDashboard;
