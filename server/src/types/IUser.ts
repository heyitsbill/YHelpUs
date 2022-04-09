export interface IUser {
  _id?: string;
  email: string; 
  password: string;
  name: string;
  checkPassword?: (password: string) => Boolean;
};
