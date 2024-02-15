import { ProductCarousel } from "@/components/ProductCarousel";
import TitleSection from "@/components/TitleSection";
import { useAuth } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import ProductList from "@/modules/product/ProductList";
import {
  getAllProductsApi,
  getProductDetailApi,
} from "@/services/productService";
import { TProduct } from "@/types/main-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [wishlist, setWishlist] = useState<TProduct[]>([]);
  const [lastestProducts, setLastestProducts] = useState<TProduct[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState<boolean>(false);
  const [loadingLastestProducts, setLoadingLastestProducts] =
    useState<boolean>(false);

  useEffect(() => {
    fetchFavoriteProducts();
    fetchLastestProducts();
  }, [currentUser?.favorites]);

  // FETCH FAVORITE PRODUCTS
  async function fetchFavoriteProducts() {
    try {
      const lists = [];
      setLoadingWishlist(true);
      for (const item of currentUser?.favorites as string[]) {
        const res = await getProductDetailApi(item);
        if (res) {
          lists.push(res);
        }
      }
      setWishlist(lists);
      setLoadingWishlist(false);
    } catch (error) {
      console.log("Failed to fetch favorite products: ->", error);
      setWishlist([]);
      setLoadingWishlist(false);
    }
  }

  //FETCH LASTEST PRODUCTS
  async function fetchLastestProducts() {
    try {
      setLoadingLastestProducts(true);
      const products = await getAllProductsApi();
      setLastestProducts(products?.docs);
      setLoadingLastestProducts(false);
    } catch (error) {
      console.log("Failed to fetch lastest products: ->", error);
      setLastestProducts([]);
      setLoadingLastestProducts(false);
    }
  }

  return (
    <section className="mt-[80px] mb-[140px]">
      {/* Wishlist */}
      <div>
        <TitleSection>Wishlist ({wishlist?.length})</TitleSection>
        <ProductList
          isLoading={loadingWishlist}
          products={wishlist}
          className="grid-cols-4"
        />
      </div>

      {/* Just For You */}
      <div className="mt-[88px]">
        <div className="flex items-center justify-between">
          <TitleSection>Just For You</TitleSection>
          <Button
            onClick={() => navigate("/shop")}
            variant="outline"
            className="h-[50px] px-10 border-gray-500"
          >
            See All
          </Button>
        </div>

        <ul className="flex items-center gap-[30px] mt-[60px]">
          <ProductCarousel
            data={lastestProducts}
            loading={loadingLastestProducts}
          />
        </ul>
      </div>
    </section>
  );
};

export default Wishlist;
