import { Eye, Heart } from "lucide-react";
import { TProduct } from "@/types/main-types";
import { displayStar } from "@/utils/helper";
import { Skeleton } from "@/components/ui/skeleton";
import { twMerge } from "tailwind-merge";

const ProductCard = ({ item }: { item: TProduct }) => {
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
          <span className="flex items-center justify-center w-[35px] h-[35px] bg-white rounded-full">
            <Heart />
          </span>
          <span className="flex items-center justify-center w-[35px] h-[35px] bg-white rounded-full">
            <Eye />
          </span>
        </div>

        <div>
          <img
            src={item?.thumbnail}
            alt={item?.name}
            className="object-contain"
          />
        </div>

        <button className="group-hover:translate-y-0 translate-y-11  transition-all hover:bg-black/80 duration-300 text-white absolute bottom-0  bg-black w-full h-[41px] rounded-bl-lg rounded-br-lg">
          Add To Cart
        </button>
      </div>

      {/* BOTTOM */}
      <div className="mt-2">
        <h1 className="font-semibold line-clamp-2 capitalize">{item?.name}</h1>
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
