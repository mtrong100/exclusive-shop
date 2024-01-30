import { queryParams } from "@/constanst";
import axios from "axios";

export const getCategories = async (
  page = queryParams.PAGE,
  limit = queryParams.LIMIT,
  order = queryParams.ORDER,
  query = ""
) => {
  let res;

  if (query) {
    res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/category/all?query=${query}`
    );
  } else {
    res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/category/all?page=${page}&limit=${limit}&order=${order}`
    );
  }

  return res.data;
};

export const createCategoryApi = async (token: string, data: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/category/create`,
    { name: data },
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};

export const updateCategoryApi = async (
  id: string,
  token: string,
  data: string
) => {
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/category/update/${id}`,
    { name: data },
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};

export const deleteCategoryApi = async (id: string, token: string) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/category/delete/${id}`,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};
