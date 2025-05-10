export interface IUser {
  name: string;
  email: string;
  password: string;
  accountType?: "saving" | "current";
  balance?: number;
}
