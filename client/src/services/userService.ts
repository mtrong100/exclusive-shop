import { TUpdateUserRequest } from "@/types/general-types";
import axios from "axios";

export const getUserDetailApi = async (id: string, token: string) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${id}`, {
    headers: { token: `Bearer ${token}` },
  });

  return res.data;
};

export const updateUserApi = async (
  id: string,
  token: string,
  data: TUpdateUserRequest
) => {
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/user/update/${id}`,
    data,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};
