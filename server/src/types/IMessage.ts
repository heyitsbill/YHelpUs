export interface IMessage {
    _id?: string;
    from: string; 
    to: string;
    content: string;
    createdAt: Date;
};
  