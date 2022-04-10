import { Request, Response, Router } from "express";
import { CallbackError, NativeError } from "mongoose";
import { Message } from "../models";
import { IMessage } from "../types";

const router = Router();

// router.get('/:currentUser', async(req: Request, res: Response) => {
//   try {
//     const selector = {$or: [{from: req.params.currentUser}, {to: req.params.currentUser}]};
//     const messages = await Message.find(selector);
//     res.send(messages)
//   } catch (err) {
//     res.status(500).send("A database error occurred.");
//   }
// })

router.post('/', (req: Request, res: Response) => {
  const message = req.body;
  console.log(message);
  const newMsg = new Message(message);
  newMsg.save((err: CallbackError, savedMsg: IMessage) => {
    if(err) return res.status(500).send("A database error occurred.");
    return res.json(savedMsg);
  });
});

router.get('/:postId', async(req: Request, res: Response) => {
  try {
    const selector = {postId: req.params.postId};
    // const messages = await Message.find(selector);
    const messages = await Message.find();
    console.log(messages);
    return res.send(messages)
  } catch (err) {
    res.status(500).send("A database error occurred.");
  }
})

export default router;
