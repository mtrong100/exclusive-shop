import ProductCard from "@/components/ProductCard";
import { ProductCarousel } from "@/components/ProductCarousel";
import TitleSection from "@/components/TitleSection";
import { useAuth } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import { getProductDetailApi } from "@/services/productService";
import { TProduct } from "@/types/main-types";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const lists = [];
      for (const item of currentUser?.favorites as string[]) {
        const res = await getProductDetailApi(item);
        if (res) {
          lists.push(res);
        }
      }
      setProducts(lists);
    }
    fetchProducts();
  }, [currentUser?.favorites]);

  return (
    <section className="mt-[80px] mb-[140px]">
      {/* Wishlist */}
      <div>
        <TitleSection>Wishlist (4)</TitleSection>

        <ul className="grid grid-cols-4 gap-x-[30px] gap-y-[60px] mt-[60px]">
          {products?.map((item) => (
            <ProductCard key={item?._id} item={item} />
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
