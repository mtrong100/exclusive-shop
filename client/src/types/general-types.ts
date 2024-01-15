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

export type TSortType = {
  title: string;
  value: string;
};
