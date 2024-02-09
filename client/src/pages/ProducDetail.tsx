import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TitleSection from "@/components/TitleSection";
import useGetProductDetail from "@/modules/product/useGetProductDetail";
import { displayStar } from "@/utils/helper";
import { useCart } from "@/components/cart-context";
import { toast } from "sonner";
import { favoriteProductApi } from "@/services/productService";
import { useAuth } from "@/components/auth-context";
import { getUserDetailApi } from "@/services/userService";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProducDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { currentUser, setCurrentUser } = useAuth();
  const { data } = useGetProductDetail(id as string);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleAddToCart = () => {
    const product = {
      product: data?._id as string,
      name: data?.name as string,
      image: data?.thumbnail as string,
      quantity,
      price: data?.price as number,
    };

    addToCart(product);
  };

  const handleFavoriteProduct = async () => {
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

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const isFavorited = currentUser?.favorites?.includes(id as string);

  return (
    <section className="mt-[80px] mb-[140px]">
      <div className="grid grid-cols-[700px_minmax(0,_1fr)] gap-[70px] items-start">
        {/* PRODUCT IMAGES */}
        <div className="grid grid-cols-[170px_minmax(0,_1fr)] gap-[30px]">
          <div className="flex flex-col gap-[16px]">
            {data?.images?.map((item, index) => (
              <img
                onClick={() => setSelectedImage(item)}
                key={index}
                src={item}
                alt={item}
                className="rounded-lg w-[170px] h-[138px] object-cover border"
              />
            ))}
          </div>

          <img
            src={selectedImage || data?.thumbnail}
            alt={data?.name}
            className="rounded-lg w-[500px] h-[600px] object-contain"
          />
        </div>

        {/* PRODUCT INFO */}
        <div>
          <div>
            <h1 className="text-2xl font-semibold mb-[16px] capitalize">
              {data?.name}
            </h1>
            <div className=" flex items-center gap-2 text-lg">
              {displayStar(data?.rating as string)}
            </div>
            <p className="text-3xl mt-[16px] font-semibold">
              {data?.price + "$"}
            </p>
            <p className="mt-[24px]">{data?.description}</p>
          </div>

          <Separator className="my-5" />

          {/* ACTION */}
          <div className="flex items-center gap-5">
            {/* INCREASE & DECREASE */}
            <div className="border border-black flex items-center rounded-lg">
              <span
                onClick={() => setQuantity(quantity - 1)}
                className="border-r border-black w-[40px] h-[44px] flex items-center justify-center cursor-pointer"
              >
                <Minus size={18} />
              </span>
              <span className="w-[80px] font-medium text-lg flex items-center justify-center">
                {quantity}
              </span>
              <span
                onClick={() => setQuantity(quantity + 1)}
                className="border-l bg-primary text-white cursor-pointer border-black w-[40px] h-[44px] flex items-center justify-center"
              >
                <Plus size={18} />
              </span>
            </div>

            <Button onClick={handleAddToCart} className="h-[45px] px-10">
              Buy Now
            </Button>

            {isFavorited ? (
              <div
                onClick={handleFavoriteProduct}
                className={`flex items-center justify-center rounded-lg border w-[40px] h-[40px] cursor-pointer bg-primary text-white `}
              >
                <FaHeart size={20} />
              </div>
            ) : (
              <div
                onClick={handleFavoriteProduct}
                className={`flex items-center justify-center rounded-lg border border-black w-[40px] h-[40px] cursor-pointer hover:bg-primary/10`}
              >
                <FaRegHeart size={20} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-[150px]">
        <TitleSection>Related Item</TitleSection>
        <ul className="flex items-center gap-[30px] mt-[60px]">
          {/* <ProductCarousel /> */}
        </ul>
      </div>
    </section>
  );
};

export default ProducDetail;
