import ProductCard from "@/components/ProductCard";
import { ProductCarousel } from "@/components/ProductCarousel";
import TitleSection from "@/components/TitleSection";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  return (
    <section className="mt-[80px] mb-[140px]">
      {/* Wishlist */}
      <div>
        <div className="flex items-center justify-between">
          <TitleSection>Wishlist (4)</TitleSection>
          <Button variant="outline" className="h-[50px] px-10 border-gray-500">
            Move All To Bag
          </Button>
        </div>

        <ul className="grid grid-cols-4 gap-x-[30px] gap-y-[60px] mt-[60px]">
          {Array(4)
            .fill(0)
            .map((item, index) => (
              <ProductCard key={index} />
            ))}
        </ul>
      </div>

      {/* Just For You */}
      <div className="mt-[88px]">
        <div className="flex items-center justify-between">
          <TitleSection>Just For You</TitleSection>
          <Button variant="outline" className="h-[50px] px-10 border-gray-500">
            See All
          </Button>
        </div>

        <ul className="flex items-center gap-[30px] mt-[60px]">
          <ProductCarousel />
        </ul>
      </div>
    </section>
  );
};

export default Wishlist;
