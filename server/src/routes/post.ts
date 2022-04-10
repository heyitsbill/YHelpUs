import { Request, Response, Router } from "express";
import { CallbackError, NativeError } from "mongoose";
import { Post } from "../models";
import { IPost } from "../types";
import { flagger } from '../../../gcloud'


const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const post = req.body;
    let flag = await flagger(post.description);
    flag = flag || await flagger(post.title);
    if(flag) {
        return res.status(400).send("Post contains inappropriate content");
    }
    const newPost = new Post(post);
    newPost.save((err: CallbackError, savedJob: IPost) => {
      if(err) return res.status(500).send("A database error occurred.");
      return res.json(savedJob);
    });
  });

router.delete("/:postID", (req: Request, res: Response) => {
  Post.findByIdAndDelete({ _id: req.params.postID }, (err: CallbackError, deletedPost: IPost) => {
    if (!deletedPost) return res.status(404).send("Post not found.");
    else if (err) return res.status(500).send("A database error occurred.");
    return res.status(200).send("Post deleted.");
  });
});

router.get("/", async(req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    res.status(500).send("A database error occurred.");
  }
});

//mark post as accepted
router.patch("/:postID", async(req: Request, res: Response) => {
  const patchPost = req.body;
  const filter = { _id: req.params.postID };
  const opts = { new: true, runValidators: true };
  Post.findOneAndUpdate(filter, patchPost, opts, (err: CallbackError, savedPost: IPost) => {
    if(err) return res.status(500).send("A database error occurred.");
    return res.json(savedPost);
  });
});

router.get("/:userID", async(req: Request, res: Response) => {
  try {
    const posts = await Post.find({$or: [{authorID: req.params.userID}, {accepteeID: req.params.userID}]});
    res.send(posts);
  } catch (err) {
    res.status(500).send("A database error occurred.");
  }
});

router.get("/mine/:userID", async(req: Request, res: Response) => {
  try {
    const posts = await Post.find({authorID: req.params.userID});
    res.send(posts);
  } catch (err) {
    res.status(500).send("A database error occurred.");
  }
});

router.get("/theirs/:userID", async(req: Request, res: Response) => {
  try {
    const posts = await Post.find({accepteeID: req.params.userID});
    res.send(posts);
  } catch (err) {
    res.status(500).send("A database error occurred.");
  }
});

export default router;