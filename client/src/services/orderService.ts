import axios from "axios";

export const createOrderApi = async (token: string, data: any) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/order/create`,
    data,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};
