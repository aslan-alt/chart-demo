import {RequestHandler} from 'express';
import {MessageModel} from '../model/messageModel';

export const addMessage: RequestHandler = async (req, res) => {
  const {from, to, message} = req.body;
  try {
    const msg = await MessageModel.create({
      message: {
        text: message,
      },
      users: [from, ...to],
      sender: from,
    });
    res.json({
      msg: msg ? 'Message sent successfully' : 'Message sending failed',
      allMessage: await getProjectMessages({from, to}),
    });
  } catch (e) {
    console.log(e);
  }
};
export const getAllMessages: RequestHandler = async (req, res) => {
  const {from, to} = req.body;
  try {
    res.json(await getProjectMessages({from, to}));
  } catch (e) {
    console.log(e);
  }
};

const getProjectMessages = async ({from, to}: {from: string; to: string[]}) => {
  const messages = await MessageModel.find({
    users: {
      $all: [from, ...to],
    },
  }).sort({updatedAt: 1});

  return messages.map((msg) => {
    return {
      fromSelf: msg?.sender?.toString() === from,
      message: msg.message?.text,
      updatedAt: msg.updatedAt,
      sender: msg?.sender?.toString(),
    };
  });
};
