import { Request, Response, Router } from "express";
import { Message } from "../models";

const router = Router();

router.get('/:currentUser/:otherUser', async(req: Request, res: Response) => {
  try {
    const selector = {$or: [{from: req.params.currentUser, to: req.params.otherUser}, {from: req.params.otherUser, to: req.params.currentUser}]};
    const messages = await Message.find(selector);
    res.send(messages)
  } catch (err) {
    res.status(500).send("A database error occurred.");
  }
})

router.post('/:currentUser/:otherUser', async(req: Request, res: Response) => {
  try {
    const messages = await Message.find(selector);
    res.send(messages)
  } catch (err) {
    res.status(500).send("A database error occurred.");
  }
})
export default router;
