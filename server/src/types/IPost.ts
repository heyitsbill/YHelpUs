import { IUser } from "./IUser";
export interface IPost {
    _id?: string;
    title: string;
    authorID: string;
    price: number; 
    description: string;
    time: Date;
    status: string;
    length: string;
    activeUntil?: Date;
    author?: IUser;
    acceptee?: IUser;
    accepteeID?: string;
  };
  
