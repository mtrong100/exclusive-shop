import { TUser } from "@/types/main-types";
import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  currentUser: TUser | null;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<TUser | null>(() => {
    const value: string | null = localStorage.getItem("EXCLUSIVE_USER");
    const parseJson = value ? JSON.parse(value) : null;
    return parseJson;
  });

  const value: AuthContextProps = {
    setCurrentUser,
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
