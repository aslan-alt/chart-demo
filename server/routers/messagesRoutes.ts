import express from 'express';
import {addMessage, getAllMessages} from '../controllers/messagesController';

const messageRouter = express.Router();
messageRouter.post('/addMessage', addMessage);
messageRouter.post('/getAllMessages', getAllMessages);
export {messageRouter};
