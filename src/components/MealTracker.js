import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { fetchNutritionInfo } from "../services/api";

export const MealTracker = () => {
  const [mealInput, setMealInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleTrackMeal = async () => {
    if (!mealInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchNutritionInfo(mealInput);
      setNutritionInfo(data);
    } catch (err) {
      setError("Failed to fetch nutrition information");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Your Meal</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter what you ate (e.g., 1 apple, 2 eggs)"
          value={mealInput}
          onChangeText={setMealInput}
          multiline
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleTrackMeal}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Track</Text>
          )}
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {nutritionInfo && (
        <View style={styles.nutritionContainer}>
          <Text style={styles.nutritionTitle}>Nutrition Information</Text>
          {nutritionInfo.foods.map((food, index) => (
            <View key={index} style={styles.foodItem}>
              <Text style={styles.foodName}>{food.food_name}</Text>
              <Text style={styles.nutritionText}>
                Calories: {Math.round(food.nf_calories)}
              </Text>
              <Text style={styles.nutritionText}>
                Protein: {Math.round(food.nf_protein)}g
              </Text>
              <Text style={styles.nutritionText}>
                Carbs: {Math.round(food.nf_total_carbohydrate)}g
              </Text>
              <Text style={styles.nutritionText}>
                Fat: {Math.round(food.nf_total_fat)}g
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    margin: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0782F9",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  errorText: {
    color: "#ff6b6b",
    marginBottom: 16,
  },
  nutritionContainer: {
    marginTop: 16,
  },
  nutritionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  foodItem: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
    textTransform: "capitalize",
  },
  nutritionText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});
