import express from 'express';
import { generateVeganRecipe } from '../controllers/recipeController.js';

const router = express.Router();

router.post('/generate-vegan-recipe', generateVeganRecipe);

export default router;
 
