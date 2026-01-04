import axios from "axios";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
 
export const generateRecipeFromGemini = async (ingredients, cuisine, dietType) => {
  const prompt = `Create a detailed ${dietType} recipe using the following ingredients: ${ingredients.join(
    ", "
  )} in ${cuisine} cuisine. Include ingredients list, steps, and cooking time.`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return result || "No recipe generated.";
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    throw new Error("Gemini API failed");
  }
};
