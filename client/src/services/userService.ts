import { queryParams } from "@/constanst";
import { TUpdateUserRequest } from "@/types/general-types";
import axios from "axios";

export const getAllUsersApi = async (
  token: string,
  page = queryParams.PAGE,
  limit = queryParams.LIMIT,
  sort = queryParams.SORT,
  order = queryParams.ORDER,
  query = ""
) => {
  let res;

  if (query) {
    res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user/all?query=${query}`,
      {
        headers: { token: `Bearer ${token}` },
      }
    );
  } else {
    res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/user/all?page=${page}&limit=${limit}&sort=${sort}&order=${order}`,
      {
        headers: { token: `Bearer ${token}` },
      }
    );
  }

  return res.data;
};

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

export const deleteUserApi = async (id: string, token: string) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/user/delete/${id}`,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};
