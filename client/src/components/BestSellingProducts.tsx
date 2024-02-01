import TitleSection from "./TitleSection";
import { ProductCarousel } from "./ProductCarousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { getAllProductsApi } from "@/services/productService";
import { useEffect, useState } from "react";
import { TProduct } from "@/types/main-types";
import { queryParams } from "@/constanst";

const BestSellingProducts = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<TProduct[]>([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getAllProductsApi(queryParams.PAGE, 4, "asc");
      setProductList(data?.docs);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between ">
        <TitleSection>Best Selling Products</TitleSection>
        <Button
          onClick={() => navigate("/shop")}
          className="h-[50px] rounded-md px-10"
        >
          View All
        </Button>
      </div>
      <ul className="flex items-center gap-[30px] mt-[60px]">
        <ProductCarousel data={productList} loading={isLoading} />
      </ul>
    </div>
  );
};

export default BestSellingProducts;
