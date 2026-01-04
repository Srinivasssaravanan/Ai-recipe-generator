import { generateRecipeFromGemini } from "../services/geminiService.js";

export const generateRecipe = async (req, res) => {
  const { selectedIngredients, cuisine, dietType } = req.body; 

  if (!selectedIngredients || !cuisine || !dietType) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const recipe = await generateRecipeFromGemini(selectedIngredients, cuisine, dietType);
    res.status(200).json({ recipe });
  } catch (err) {
    res.status(500).json({ error: "Gemini API failed" });
  }
};
