import { Eye } from "lucide-react";
import { TProduct } from "@/types/main-types";
import { displayStar } from "@/utils/helper";
import { Skeleton } from "@/components/ui/skeleton";
import { twMerge } from "tailwind-merge";
import { useCart } from "./cart-context";
import { Link } from "react-router-dom";
import { favoriteProductApi } from "@/services/productService";
import { getUserDetailApi } from "@/services/userService";
import { toast } from "sonner";
import { useAuth } from "./auth-context";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ item }: { item: TProduct }) => {
  const { addToCart } = useCart();
  const { currentUser, setCurrentUser } = useAuth();

  const handleAddToCart = (item: TProduct) => {
    const data = {
      product: item?._id,
      name: item?.name,
      image: item?.thumbnail,
      quantity: 1,
      price: item?.price,
    };

    addToCart(data);
  };

  const handleFavoriteProduct = async (id: string) => {
    try {
      const token = JSON.parse(localStorage.getItem("EXCLUSIVE_TOKEN") || "");
      await favoriteProductApi(id as string, token);
      const user = await getUserDetailApi(currentUser?._id as string, token);
      setCurrentUser(user);
      localStorage.setItem("EXCLUSIVE_USER", JSON.stringify(user));
    } catch (error) {
      console.log(error);
      toast.error("Failed to favorite product");
    }
  };

  const isFavorited = currentUser?.favorites?.includes(item?._id as string);

  return (
    <article className="rounded-sm group ">
      {/* TOP */}
      <div className="h-[250px] bg-[#F5F5F5] overflow-hidden rounded-lg relative flex flex-col items-center justify-center">
        {item?.discount !== 0 && (
          <span className="py-[4px] px-3 text-sm text-white rounded-lg bg-primary absolute top-3 left-3">
            {`-${item?.discount}%`}
          </span>
        )}

        <div className="flex flex-col gap-3 absolute top-3 right-3">
          {isFavorited ? (
            <span
              onClick={() => handleFavoriteProduct(item?._id)}
              className="flex items-center justify-center w-[35px] h-[35px] rounded-full bg-primary text-white"
            >
              <FaHeart />
            </span>
          ) : (
            <span
              onClick={() => handleFavoriteProduct(item?._id)}
              className="flex items-center justify-center w-[35px] h-[35px] bg-white rounded-full"
            >
              <FaRegHeart size={20} />
            </span>
          )}

          <Link
            to={`/product/${item?._id}`}
            className="flex items-center justify-center w-[35px] h-[35px] bg-white rounded-full"
          >
            <Eye />
          </Link>
        </div>

        <Link to={`/product/${item?._id}`}>
          <img
            src={item?.thumbnail}
            alt={item?.name}
            className="object-contain"
          />
        </Link>

        <button
          onClick={() => handleAddToCart(item)}
          className="group-hover:translate-y-0 translate-y-11  transition-all hover:bg-black/80 duration-300 text-white absolute bottom-0  bg-black w-full h-[41px] rounded-bl-lg rounded-br-lg"
        >
          Add To Cart
        </button>
      </div>

      {/* BOTTOM */}
      <div className="mt-2">
        <Link
          to={`/product/${item?._id}`}
          className="font-semibold line-clamp-2 capitalize hover:underline"
        >
          {item?.name}
        </Link>
        <div className="flex items-center gap-3 mt-1 font-medium">
          <p className="text-primary font-bold text-2xl">{item?.price + "$"}</p>
        </div>

        <div className="mt-2 flex items-center gap-2">
          {displayStar(item?.rating)}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

export const ProductCardSkeleton = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <Skeleton className={twMerge("rounded-sm h-[374px]", className)}></Skeleton>
  );
};
