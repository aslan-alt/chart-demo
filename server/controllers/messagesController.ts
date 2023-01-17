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
export const getAllMessages: RequestHandler = async (req, res) => {
  const {from, to} = req.body;
  try {
    const messages = await MessageModel.find({
      users: {
        $all: [from, ...to],
      },
    }).sort({updatedAt: 1});
    const projectMessages = messages.map((msg) => {
      return {
        sender: msg.message?.sender.toString(),
        message: msg.message?.text,
      };
    });
    res.json(projectMessages);
  } catch (e) {
    console.log(e);
  }
};
