import express from 'express';
import { getUsers, createUser, getUser, deleteUser, updateUser } from '../controller/user.controller.js';

const userRoutes = express.Router();

// admin get all users
userRoutes.route('/create')
    .post(createUser) // create

userRoutes.route('/login')
    .post(getUser) // login

userRoutes.route('/logout')
    .post(getUser) // logout


export default userRoutes;