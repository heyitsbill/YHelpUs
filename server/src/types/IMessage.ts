export interface IMessage {
    _id?: string;
    fromID: string; 
    toID: string;
    content: string;
    createdAt: Date;
};
  