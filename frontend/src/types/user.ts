export interface IUser {
  _id: string;
  name: string;
  email: string;
  accountType: string;
  image?: string;
  phone?:string;
  address?:string;
  createdAt: string;
  updatedAt: string;
}
