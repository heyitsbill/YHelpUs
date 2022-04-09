import { IUser } from "./IUser";
export interface IPost {
    _id?: string;
    authorID: string;
    price: number; 
    description: string;
    time: Date;
    status: string;
    length: string;
    activeUntil?: Date;
    author?: IUser;
  };
  
