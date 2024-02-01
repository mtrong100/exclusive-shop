import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import { TProduct } from "@/types/main-types";
import { twMerge } from "tailwind-merge";

interface ProductListProps {
  className?: string;
  loadingAmount?: number;
  isLoading: boolean;
  products: TProduct[];
}

const ProductList = ({
  className = "",
  isLoading = false,
  products = [],
  loadingAmount = 10,
}: ProductListProps) => {
  return (
    <ul
      className={twMerge("grid grid-cols-5 gap-x-5 gap-y-10 mt-8", className)}
    >
      {isLoading &&
        Array(loadingAmount)
          .fill(0)
          .map((index) => <ProductCardSkeleton key={index} />)}

      {!isLoading &&
        products?.map((item) => <ProductCard key={item?._id} item={item} />)}
    </ul>
  );
};

export default ProductList;
