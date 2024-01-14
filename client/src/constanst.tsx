import {
  Camera,
  Gamepad2,
  Headphones,
  Laptop,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  User,
  Watch,
} from "lucide-react";
import {
  TBrowseCategory,
  TMenuDropdown,
  TNavLink,
} from "./types/general-types";

export const productSizes: string[] = ["S", "M", "L", "XL"];

export const navLinks: TNavLink[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Shop",
    path: "/shop",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Sign Up",
    path: "/register",
  },
];

export const categories: string[] = [
  "Woman’s Fashion",
  "Men’s Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby’s & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

export const browseCategory: TBrowseCategory[] = [
  {
    title: "Phone",
    icon: <Smartphone size={30} />,
  },
  {
    title: "Computers",
    icon: <Laptop size={30} />,
  },
  {
    title: "SmartWatch",
    icon: <Watch size={30} />,
  },
  {
    title: "Camera",
    icon: <Camera size={30} />,
  },
  {
    title: "HeadPhones",
    icon: <Headphones size={30} />,
  },
  {
    title: "Gaming",
    icon: <Gamepad2 size={30} />,
  },
];

export const menuDropdown: TMenuDropdown[] = [
  {
    title: "My Profile",
    icon: <User size={20} />,
    path: "/profile",
  },
  {
    title: "My Order",
    icon: <ShoppingBag size={20} />,
    path: "/order",
  },
  {
    title: "My Cart",
    icon: <ShoppingCart size={20} />,
    path: "/cart",
  },
];
