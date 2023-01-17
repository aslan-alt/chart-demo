import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {userRouter} from './routers/userRoutes';
import {messageRouter} from './routers/messagesRoutes';

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
app.listen(port, () => {
  console.log(`listening ${port}`);
});
