import { queryParams } from "@/constanst";
import { TProductRequest } from "@/types/general-types";
import axios from "axios";

export const getAllProductsApi = async (
  page = queryParams.PAGE,
  limit = queryParams.LIMIT,
  order = queryParams.ORDER,
  query = ""
) => {
  let res;

  if (query) {
    res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/product/all?query=${query}`
    );
  } else {
    res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/product/all?page=${page}&limit=${limit}&order=${order}`
    );
  }

  return res.data;
};

export const getProductByCategoryApi = async (
  page = queryParams.PAGE,
  limit = queryParams.LIMIT,
  order = queryParams.ORDER,
  query = "",
  category = ""
) => {
  let res;

  if (query) {
    res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/product/category/${category}?query=${query}`
    );
  } else {
    res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/product/category/${category}?page=${page}&limit=${limit}&order=${order}`
    );
  }

  return res.data;
};

export const getProductDetailApi = async (id: string) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/${id}`);

  return res.data;
};

export const createProductApi = async (
  token: string,
  data: TProductRequest
) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/product/create`,
    data,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};

export const updateProductApi = async (
  id: string,
  token: string,
  data: TProductRequest
) => {
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/product/update/${id}`,
    data,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};

export const deleteProductApi = async (id: string, token: string) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/product/delete/${id}`,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};
