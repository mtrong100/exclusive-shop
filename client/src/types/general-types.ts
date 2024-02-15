import React from "react";

export type TNavLink = {
  title: string;
  path: string;
};

export type TBrowseCategory = {
  title: string;
  icon: React.ReactNode;
};

export type TMenuDropdown = {
  title: string;
  icon: React.ReactNode;
  path: string;
};

export type TSortOrder = {
  title: string;
  value: string;
};

export type TRegisterRequest = {
  name: string;
  email: string;
  password?: string;
  avatar: string;
  isAdmin: boolean;
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TResetPasswordRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export type TUpdateUserRequest = {
  name: string;
  address: string;
  phone: string;
};

export type TProductRequest = {
  name: string;
  thumbnail: string;
  images: string[];
  category: string;
  rating: string;
  price: number;
  description: string;
  stock: number;
  discount?: number;
};
