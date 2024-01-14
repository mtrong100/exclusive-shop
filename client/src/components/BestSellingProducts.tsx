import TitleSection from "./TitleSection";
import { ProductCarousel } from "./ProductCarousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const BestSellingProducts = () => {
  const navigate = useNavigate();

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
        <ProductCarousel />
      </ul>
    </div>
  );
};

export default BestSellingProducts;
