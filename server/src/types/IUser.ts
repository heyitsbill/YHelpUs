export interface IUser {
  _id?: string;
  email: string; 
  password: string;
  checkPassword?: (password: string) => Boolean;
};
