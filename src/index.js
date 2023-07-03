import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './domain/response.js';
import HttpStatus from './controller/ingredient.controller.js';
import ingredientRoutes from './route/ingredient.route.js';
import logger from './util/logger.js';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3001;
const app = express();
// change later? 
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/ingredients', ingredientRoutes);
app.get('/', (req, res) => res.send( new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Ingredient API, v1.0.0 - All Systems Go')));
// routes not created
app.all('*', (req, res) => res.status(HttpStatus.NOT_FOUND.code).send( new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist on the server')));

app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}:${PORT}`));