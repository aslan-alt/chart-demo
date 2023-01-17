import {RequestHandler} from 'express';
import bcrypt from 'bcrypt';
import {UserSchema} from '../model/userModel';
import mongoose from 'mongoose';
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
    const User = mongoose.model('user', UserSchema);
    const userAlreadyExists = await User.findOne({username});
    console.log(userAlreadyExists);
    if (userAlreadyExists) {
      return res.json({msg: 'Username Already used', status: false});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      avatarImage,
    });
    res.json({status: true, user: omit(user, 'password')});
  } catch (error) {
    res.json({status: false, error, msg: 'registration failed'});
  }
};
