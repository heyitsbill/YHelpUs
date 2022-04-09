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
  },
  status:{
    type: String,
    enum:{
      values: ["active", "accepted", "expired", "completed"],
      message: "Invalid status"
    },
    required: true
  },
  length:{
    type: String,
    enum:{
      values: ["0-10 min", "10-30 min", "30-60 min", "60+ min", "N/A"],
      message: "Invalid length"
    },
    required: true
  },
  activeUntil:{
    type: Date,
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
