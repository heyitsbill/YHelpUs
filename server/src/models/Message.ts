import mongoose, { Schema, Types } from "mongoose";
import { IMessage } from "../types";

const MessageSchema = new mongoose.Schema({
  from:{
    type: Schema.Types.ObjectId,
    required: true
  },
  to:{
    type: Schema.Types.ObjectId,
    required: true
  },
  content:{
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    required: true
  }
});

MessageSchema.set('toJSON', {
  virtuals: true
});

MessageSchema.set('toObject', {
  virtuals: true
});



export const Message = mongoose.model<IMessage & mongoose.Document>("Message", MessageSchema);
export default Message;
