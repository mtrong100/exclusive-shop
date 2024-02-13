import { queryParams } from "@/constanst";
import { getProductByCategoryApi } from "@/services/productService";
import { TProduct } from "@/types/main-types";
import { useEffect, useState } from "react";

export default function useGetRelatedProducts(category: string) {
  const [relatedProducts, setRelatedProducts] = useState<TProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await getProductByCategoryApi(
          queryParams.PAGE,
          queryParams.LIMIT,
          queryParams.ORDER,
          "",
          category
        );
        setRelatedProducts(res?.docs);
        setIsLoading(false);
      } catch (error) {
        console.log("Failed to load related products", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [category]);

  return { relatedProducts, isLoading };
}
