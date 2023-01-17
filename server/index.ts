import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {userRouter} from './routers/userRoutes';
import {messageRouter} from './routers/messagesRoutes';
const socket = require('socket.io');

dotenv.config();
const app = express();

const port = process.env.PORT ?? 8000;

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL ?? '').catch((e) => {
  console.log(e.message);
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (['http://localhost:3000'].includes(origin ?? '')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);
app.use(express.json());
app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter);

const server = app.listen(port, () => {
  console.log(`listening ${port}`);
});

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

// TODO: remove @ts-ignore
const onlineUsers = new Map();
// @ts-ignore
io.on('connection', (socket) => {
  // @ts-ignore
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  // @ts-ignore
  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-receive', data);
    }
  });
});
