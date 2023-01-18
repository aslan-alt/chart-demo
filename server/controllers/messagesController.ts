import {RequestHandler} from 'express';
import {MessageModel} from '../model/messageModel';

export const addMessage: RequestHandler = async (req, res) => {
  const {from, to, message, quote} = req.body;
  try {
    const lastMessage = await MessageModel.create({
      message: {text: message},
      users: [from, ...to],
      sender: from,
      ...(quote ? {quote} : {}),
    });

    res.json({
      msg: lastMessage ? 'Message sent successfully' : 'Message sending failed',
      allMessage: await getProjectMessages({from, to}),
      lastMessage: {
        from,
        // TODO: Refactor "to"
        to: to[0],
        updatedAt: lastMessage.updatedAt,
        message: lastMessage.message?.text,
        ...(quote ? {quote} : {}),
      },
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
      ...(msg.quote ? {quote: msg.quote} : {}),
    };
  });
};
