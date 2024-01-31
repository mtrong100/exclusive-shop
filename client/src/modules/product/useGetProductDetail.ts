import { getProductDetailApi } from "@/services/productService";
import { TProduct } from "@/types/main-types";
import { useEffect, useState } from "react";

export default function useGetProductDetail(id: string) {
  const [data, setData] = useState<TProduct | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getProductDetailApi(id);
      if (res) setData(res);
    }
    fetchData();
  }, [id]);

  return { data };
}
