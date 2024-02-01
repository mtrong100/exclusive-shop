import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import { TProduct } from "@/types/main-types";

interface Props {
  data: TProduct[];
  loading: boolean;
}

export function ProductCarousel({ data = [], loading = false }: Props) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {loading &&
          Array(4)
            .fill(0)
            .map((index) => (
              <CarouselItem key={index} className="basis-1/4">
                <ProductCardSkeleton />
              </CarouselItem>
            ))}

        {!loading &&
          data?.map((item) => (
            <CarouselItem key={item?._id} className="basis-1/4">
              <ProductCard item={item} />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
