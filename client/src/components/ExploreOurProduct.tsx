import TitleSection from "./TitleSection";
import { Button } from "./ui/button";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const ExploreOurProduct = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TitleSection>Explore Our Products</TitleSection>
      <ul className="grid grid-cols-4 gap-x-[30px] gap-y-[60px] mt-[60px]">
        {Array(8)
          .fill(0)
          .map((item, index) => (
            <ProductCard key={index} />
          ))}
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

export default ExploreOurProduct;
