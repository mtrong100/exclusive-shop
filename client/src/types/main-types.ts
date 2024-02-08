export type TUser = {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  token: string;
  isAdmin: boolean;
  favorites: string[];
  createdAt: Date;
  updatedAt: Date;
};
export type TCategory = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TProduct = {
  _id: string;
  name: string;
  thumbnail: string;
  images: string[];
  category: string;
  rating: string;
  price: number;
  description: string;
  stock: number;
  discount?: number;
  sold?: number;
  createdAt: Date;
  updatedAt: Date;
};
