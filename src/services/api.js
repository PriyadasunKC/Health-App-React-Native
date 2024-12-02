const SPOONACULAR_API_KEY = "dd5127b7f1e74a3eb6018f1271fb1c74";

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


