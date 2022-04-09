import mongoose from "mongoose";
import { IPost } from "../types"

const PostSchema = new mongoose.Schema({
  description:{
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true
  },
  authorID:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  time:{
    type: Date,
    required: true
  }
});

PostSchema.set('toJSON', {
  virtuals: true
});

PostSchema.set('toObject', {
  virtuals: true
});

export const Post = mongoose.model<IPost & mongoose.Document>("Post", PostSchema);
export default Post;
