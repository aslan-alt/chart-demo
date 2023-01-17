import {RequestHandler} from 'express';
import {MessageModel} from '../model/messageModel';

export const addMessage: RequestHandler = async (req, res) => {
  const {from, to, message} = req.body;
  try {
    const data = await MessageModel.create({
      message: {
        text: message,
        users: [from, ...to],
        sender: from,
      },
    });
    res.json({msg: data ? 'Message sent successfully' : 'Message sending failed'});
  } catch (e) {
    console.log(e);
  }
};
export const getAllMessages: RequestHandler = async (req, res) => {};
