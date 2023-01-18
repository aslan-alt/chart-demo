import express from 'express';
import {getUsers, login, register} from '../controllers/usersController';

const userRouter = express.Router();
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/getUsers/:id', getUsers);
export {userRouter};
