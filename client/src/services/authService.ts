import { TLoginRequest, TRegisterRequest } from "@/types/general-types";
import axios from "axios";

export const loginApi = async (data: TLoginRequest) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/login`,
    data
  );

  return res.data;
};

export const googleLoginApi = async (data: TRegisterRequest) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/google-login`,
    data
  );

  return res.data;
};

export const registerApi = async (data: TRegisterRequest) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/register`,
    data
  );

  return res.data;
};
