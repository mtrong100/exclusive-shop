export type TUser = {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  token: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export type TCategory = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
