import mongoose from 'mongoose';

export const messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      users: Array,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    },
  },
  {timestamps: true}
);
export const MessageModel = mongoose.model('message', messageSchema);
