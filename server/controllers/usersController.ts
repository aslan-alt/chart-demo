import {RequestHandler} from 'express';
import bcrypt from 'bcrypt';
import {UserModel} from '../model/userModel';
import {omit} from 'lodash';

type RegisterRequest = {
  username: string;
  password: string;
  confirmPassword: string;
  avatarImage: string;
};
export const register: RequestHandler = async (req, res) => {
  try {
    const {username, password, avatarImage} = req.body as RegisterRequest;
    const userAlreadyExists = await UserModel.findOne({username});
    if (userAlreadyExists) {
      return res.json({msg: 'Username Already used', status: false});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      username,
      password: hashedPassword,
      avatarImage,
    });

    res.json({status: true, user: omit(user, 'password')});
  } catch (error) {
    res.json({status: false, error, msg: 'registration failed'});
  }
};

type LoginRequest = Omit<RegisterRequest, 'confirmPassword' | 'avatarImage'>;
export const login: RequestHandler = async (req, res) => {
  try {
    const {username, password} = req.body as LoginRequest;
    const user = await UserModel.findOne({username});
    const isPasswordValid = await bcrypt.compare(password, user?.password ?? '');
    if (!user || !isPasswordValid) {
      return res.json({msg: 'Incorrect username or password', status: false});
    }

    isPasswordValid && res.json({status: true, user: omit(user, 'password')});
  } catch (error) {
    res.json({status: false, error, msg: 'login failed'});
  }
};

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await UserModel.find({_id: {$ne: req?.params?.id}}).select([
      'username',
      'avatarImage',
      '_id',
    ]);

    if (!users) {
      return res.json({msg: 'Incorrect username or password', status: false});
    }

    res.json({status: true, users});
  } catch (error) {
    res.json({status: false, error, msg: 'login failed'});
  }
};
