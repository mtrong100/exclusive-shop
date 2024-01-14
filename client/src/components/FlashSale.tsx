import { useNavigate } from "react-router-dom";
import { ProductCarousel } from "./ProductCarousel";
import TitleSection from "./TitleSection";
import { Button } from "./ui/button";

const FlashSale = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TitleSection>Flash Sales</TitleSection>
      <ul className="flex items-center gap-[30px] mt-[60px]">
        <ProductCarousel />
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
