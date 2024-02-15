import { useNavigate } from "react-router-dom";
import { ProductCarousel } from "./ProductCarousel";
import TitleSection from "./TitleSection";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { TProduct } from "@/types/main-types";
import { getAllProductsApi } from "@/services/productService";
import { queryParams } from "@/constanst";

const FlashSale = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    fetchFlashSalesProducts();
  }, []);

  // FETCH FLASH SALES PRODUCTS
  async function fetchFlashSalesProducts() {
    try {
      setIsLoading(true);
      const data = await getAllProductsApi(
        queryParams.PAGE,
        queryParams.LIMIT,
        "price",
        "asc"
      );
      setProducts(data?.docs);
      setIsLoading(false);
    } catch (error) {
      console.log("Failed to fetch flash sales products ->", error);
      setIsLoading(false);
      setProducts([]);
    }
  }

  return (
    <div>
      <TitleSection>Flash Sales</TitleSection>
      <ul className="flex items-center gap-[30px] mt-[60px]">
        <ProductCarousel data={products} loading={isLoading} />
      </ul>
      <Button
        onClick={() => navigate("/shop")}
        className="h-[50px] rounded-md px-10 mt-[50px] flex items-center mx-auto"
      >
        View All Products
      </Button>
    </div>
  );
};

export default FlashSale;
