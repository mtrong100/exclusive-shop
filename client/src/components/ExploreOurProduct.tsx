import TitleSection from "./TitleSection";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TProduct } from "@/types/main-types";
import { getAllProductsApi } from "@/services/productService";
import { queryParams } from "@/constanst";
import ProductList from "@/modules/product/ProductList";

const ExploreOurProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<TProduct[]>([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getAllProductsApi(queryParams.PAGE, 8);
      setProductList(data?.docs);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      <TitleSection>Explore Our Products</TitleSection>
      <ProductList
        isLoading={isLoading}
        products={productList}
        loadingAmount={8}
        className="grid-cols-4"
      />
      <Button
        onClick={() => navigate("/shop")}
        className="h-[50px] rounded-md px-10 mt-[50px] flex items-center mx-auto"
      >
        View All Products
      </Button>
    </div>
  );
};

export default ExploreOurProduct;
