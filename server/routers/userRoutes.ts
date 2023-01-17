import express from 'express';
import {getUser, login, register} from '../controllers/usersController';

const userRouter = express.Router();
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/getUsers/:id', getUser);
export {userRouter};
