import express from "express";
const router = express.Router();

router.post("/generate-vegan-recipe", async (req, res) => {
  const { selectedIngredients, cuisine, userInputIngredients } = req.body;

  if (!selectedIngredients || !cuisine || !userInputIngredients) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const allIngredients = [
      ...selectedIngredients,
      ...userInputIngredients.split(",").map((i) => i.trim()),
    ];

    const recipe = {
      title: `Delicious Vegan ${cuisine} Dish`,
      ingredients: allIngredients,
      instructions: `Combine ${allIngredients.join(
        ", "
      )}. Cook and enjoy your vegan ${cuisine} dish!`,
    };

    res.status(200).json({ recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

export default router;
