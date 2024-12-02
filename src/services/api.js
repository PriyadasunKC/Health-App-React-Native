const SPOONACULAR_API_KEY = "dd5127b7f1e74a3eb6018f1271fb1c74";

const NUTRITIONIX_APP_ID = "8f0939b9";
const NUTRITIONIX_API_KEY = "6b62aa7e9bd39198b47a2e84bc6c3d04";
const NUTRITIONIX_BASE_URL = "https://trackapi.nutritionix.com/v2";

export const fetchHealthyRecipes = async () => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&number=10&diet=healthy&addRecipeInformation=true`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results.map((item) => ({
      id: item.id,
      title: item.title,
      image: item.image,
      description: `${item.healthScore} Health Score • ${item.readyInMinutes} mins`,
      status: item.vegan ? "Vegan" : item.vegetarian ? "Vegetarian" : "Healthy",
    }));
  } catch (error) {
    throw new Error("Failed to fetch health data");
  }
};


export const fetchExerciseStats = async () => {
  try {
    const response = await fetch(`${NUTRITIONIX_BASE_URL}/natural/exercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": NUTRITIONIX_APP_ID,
        "x-app-key": NUTRITIONIX_API_KEY,
      },
      body: JSON.stringify({
        query: "walked 30 minutes, ran 2 miles",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch exercise data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Exercise fetch error:", error);
    throw new Error("Failed to fetch exercise data");
  }
};

// Fetch nutrition info from Nutritionix
export const fetchNutritionInfo = async (query) => {
  try {
    const response = await fetch(`${NUTRITIONIX_BASE_URL}/natural/nutrients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": NUTRITIONIX_APP_ID,
        "x-app-key": NUTRITIONIX_API_KEY,
      },
      body: JSON.stringify({
        query: query,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch nutrition data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Nutrition fetch error:", error);
    throw new Error("Failed to fetch nutrition data");
  }
};


export const fetchHealthStats = async () => {
  try {

    const exerciseData = await fetchExerciseStats();

    const totalCaloriesBurned = exerciseData.exercises.reduce(
      (sum, exercise) => sum + exercise.nf_calories,
      0
    );

    const nutritionData = await fetchNutritionInfo(
      "1 apple, 1 banana, 1 chicken breast"
    );

    const totalCaloriesConsumed = nutritionData.foods.reduce(
      (sum, food) => sum + food.nf_calories,
      0
    );

    return {
      steps:
        exerciseData.exercises.find((ex) => ex.name.includes("walk"))
          ?.duration_min * 100 || 0,
      caloriesBurned: Math.round(totalCaloriesBurned),
      caloriesConsumed: Math.round(totalCaloriesConsumed),
      water: 0, 
      activeMinutes: exerciseData.exercises.reduce(
        (sum, ex) => sum + ex.duration_min,
        0
      ),

      progress: {
        steps:
          ((exerciseData.exercises.find((ex) => ex.name.includes("walk"))
            ?.duration_min *
            100) /
            10000) *
          100,
        calories: (totalCaloriesBurned / 500) * 100, 
        active:
          (exerciseData.exercises.reduce(
            (sum, ex) => sum + ex.duration_min,
            0
          ) /
            30) *
          100,
      },
    };
  } catch (error) {
    console.error("Error fetching health stats:", error);
    return {
      steps: 0,
      caloriesBurned: 0,
      caloriesConsumed: 0,
      water: 0,
      activeMinutes: 0,
      progress: {
        steps: 0,
        calories: 0,
        active: 0,
      },
    };
  }
};


export const searchFoodItems = async (query) => {
  try {
    const response = await fetch(`${NUTRITIONIX_BASE_URL}/search/instant`, {
      method: "GET",
      headers: {
        "x-app-id": NUTRITIONIX_APP_ID,
        "x-app-key": NUTRITIONIX_API_KEY,
      },
      params: {
        query: query,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to search food items");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Food search error:", error);
    throw new Error("Failed to search food items");
  }
};
