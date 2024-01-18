import {
  TLoginRequest,
  TRegisterRequest,
  TResetPasswordRequest,
} from "@/types/general-types";
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

export const sendOtpApi = async (data: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/send-otp`,
    { email: data }
  );

  return res.data;
};

export const resetPasswordApi = async (data: TResetPasswordRequest) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/reset-password`,
    data
  );

  return res.data;
};
