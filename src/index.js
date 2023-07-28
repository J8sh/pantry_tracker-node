import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './domain/response.js';
import HttpStatus from './controller/ingredient.controller.js';
// import UserHttpStatus from './controller/user.controller.js';
import ingredientRoutes from './route/ingredient.route.js';
import recipesRoutes from './route/recipes.route.js';
import userRoutes from './route/user.route.js';
import logger from './util/logger.js';

// import session from 'express-session';
// import MySQLStore from 'express-mysql-session';
// import mysql from 'mysql';

// const session = require("express-session");
// const MySQLStore = require("express-mysql-session");
// const mysql = require("mysql");


dotenv.config();

const PORT = process.env.SERVER_PORT || 3001;
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// var options = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// }

// var sessionConnection = mysql.createConnection(options);
// var sessionStore = new MySQLStore({
//     expiration: 300000,
//     createDatabaseTable: true,
//     schema:{
//         tableName: 'sessiontbl',
//         columnNames:{
//             session_id: 'session_id',
//             expires: 'expires',
//             data: 'data'
//         }
//     }
// }, sessionConnection);

// app.use( session({
//     key: 'keyin',
//     secret: 'my secret',
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: true
// }));

app.use('/ingredients', ingredientRoutes);
app.use('/user', userRoutes);

app.use('/recipes', recipesRoutes);

app.get('/', (req, res) => res.send( new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Ingredient API, v1.0.0 - All Systems Go')));
// routes not created
app.all('*', (req, res) => res.status(HttpStatus.NOT_FOUND.code).send( new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist on the server')));

app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}:${PORT}`));