export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  accountType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IATMCard {
  _id: string;
  user: IUser;
  account: string;
  cardNumber: string;
  pin: number;
  cvv: number;
  cardType: string;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
