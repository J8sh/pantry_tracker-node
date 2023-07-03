import express from 'express';
import { getIngredient, createIngredient, getIngredients, deleteIngredient, updateIngredient } from '../controller/ingredient.controller.js';

const ingredientRoutes = express.Router();

ingredientRoutes.route('/')
    .get(getIngredients)
    .post(createIngredient);

ingredientRoutes.route('/:id')
    .get(getIngredient)
    .put(updateIngredient)
    .delete(deleteIngredient);

export default ingredientRoutes;