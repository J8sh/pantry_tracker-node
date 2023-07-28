import express from 'express';
import { getRecipes, createRecipe, getRecipe } from '../controller/recipes.controller.js';

const userRoutes = express.Router();

// admin get all users
userRoutes.route('/')
    .get(getRecipes) // create
    .post(createRecipe)


userRoutes.route('/:name')
    .post(getRecipe) // logout


export default userRoutes;