import axios from "axios";

export const getCategories = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/category/all`);
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
    data,
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
