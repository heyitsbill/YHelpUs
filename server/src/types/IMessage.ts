import {IPost} from "./IPost";
export interface IMessage {
    _id?: string;
    from: string; 
    to?: string;
    content: string;
    createdAt: Date;
    postId: string;
    post?: IPost;
};
  