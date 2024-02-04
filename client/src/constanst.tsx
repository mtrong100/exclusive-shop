import {
  Camera,
  Gamepad2,
  Headphones,
  Laptop,
  LayoutDashboard,
  MessageCircle,
  Package,
  PackageSearch,
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
  TSortType,
} from "./types/general-types";

export const queryParams = {
  LIMIT: 10,
  PAGE: 1,
  ORDER: "desc",
};

export const COUPON_CODE = "Exclusive";
export const productSizes: string[] = ["S", "M", "L", "XL"];
export const defaultAvatar: string =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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

export const sidebarLinks: TMenuDropdown[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  {
    title: "Product",
    icon: <PackageSearch size={20} />,
    path: "/manage-product",
  },
  {
    title: "Category",
    icon: <Package size={20} />,
    path: "/manage-category",
  },
  {
    title: "Order",
    icon: <ShoppingCart size={20} />,
    path: "/manage-order",
  },
  {
    title: "User",
    icon: <User size={20} />,
    path: "/manage-user",
  },
];

export const cardSum: TBrowseCategory[] = [
  {
    title: "User",
    icon: <User size={30} />,
  },
  {
    title: "Product",
    icon: <PackageSearch size={30} />,
  },
  {
    title: "Order",
    icon: <ShoppingCart size={30} />,
  },
  {
    title: "Comment",
    icon: <MessageCircle size={30} />,
  },
];

export const demoCategories: string[] = [
  "electronics",
  "clothing",
  "home and kitchen",
  "books",
  "sports and outdoors",
  "beauty and personal care",
  "toys and games",
  "automotive",
  "health and household",
  "grocery",
];

export const sortTypes: TSortType[] = [
  {
    title: "Mới nhất",
    value: "desc",
  },
  {
    title: "Cũ nhất",
    value: "asc",
  },
];
