import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "../types";
import {User} from "../models";
import { IMessage } from "../types";

const MessageSchema = new mongoose.Schema({
  fromID:{
    type: Schema.Types.ObjectId,
    required: true
  },
  toID:{
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
