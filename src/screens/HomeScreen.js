import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useClickCount } from "../contexts/ClickCountContext";
import { globalStyles } from "../styles/globalStyles";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { clickCount, incrementCount } = useClickCount();
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      const response = await fetch(
        "https://health.gov/myhealthfinder/api/v3/topicsearch.json?lang=en"
      );
      const data = await response.json();
      setHealthData(data.Result.Resources.Resource);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching health data:", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigation.replace("Login");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={globalStyles.card}
      onPress={() => incrementCount()}
    >
      <Text style={globalStyles.cardTitle}>{item.Title}</Text>
      <Text style={globalStyles.cardStatus}>Status: Active</Text>
      <Text style={globalStyles.cardDescription}>{item.Categories}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Health Dashboard</Text>
        <Text style={globalStyles.headerEmail}>{user?.email}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={globalStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={globalStyles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={healthData}
          renderItem={renderItem}
          keyExtractor={(item) => item.Id}
          contentContainerStyle={globalStyles.listContainer}
        />
      )}

      <TouchableOpacity style={globalStyles.floatingButton}>
        <Text style={globalStyles.floatingButtonText}>
          Clicks: {clickCount}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
