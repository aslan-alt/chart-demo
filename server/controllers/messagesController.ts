import {RequestHandler} from 'express';
import {MessageModel} from '../model/messageModel';

export const addMessage: RequestHandler = async (req, res) => {
  const {from, to, message} = req.body;
  try {
    const data = await MessageModel.create({
      message: {
        text: message,
      },
      users: [from, ...to],
      sender: from,
    });
    res.json({msg: data ? 'Message sent successfully' : 'Message sending failed'});
  } catch (e) {
    console.log(e);
  }
};
export const getAllMessages: RequestHandler = async (req, res) => {
  const {from, to} = req.body;
  console.log('from--------');
  console.log(from);
  console.log('to-------');
  console.log(to);
  try {
    const messages = await MessageModel.find({
      users: {
        $all: [from, ...to],
      },
    }).sort({updatedAt: 1});
    console.log('messages-----');
    console.log(messages);
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg?.sender?.toString() === from,
        message: msg.message?.text,
        updatedAt: msg.updatedAt,
        sender: msg?.sender?.toString(),
      };
    });
    res.json(projectMessages);
  } catch (e) {
    console.log(e);
  }
};
