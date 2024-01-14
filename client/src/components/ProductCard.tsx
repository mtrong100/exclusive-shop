import { Eye, Heart } from "lucide-react";
import { FaStar } from "react-icons/fa";
import demoProduct from "../assets/images/red-console.png";

const ProductCard = () => {
  return (
    <article className="rounded-sm w-[270px] group ">
      {/* TOP */}
      <div className="h-[250px] bg-[#F5F5F5] overflow-hidden rounded-lg relative flex flex-col items-center justify-center">
        <span className="py-[4px] px-5 text-white rounded-lg bg-primary absolute top-3 left-3">
          -40%
        </span>

        <div className="flex flex-col gap-3 absolute top-3 right-3">
          <span className="flex items-center justify-center w-[35px] h-[35px] bg-white rounded-full">
            <Heart />
          </span>
          <span className="flex items-center justify-center w-[35px] h-[35px] bg-white rounded-full">
            <Eye />
          </span>
        </div>

        <div className="">
          <img
            src={demoProduct}
            alt="product-image"
            className="w-[172px] h-[152px]"
          />
        </div>

        <button className="group-hover:translate-y-0 translate-y-11  transition-all hover:bg-black/80 duration-300 text-white absolute bottom-0  bg-black w-full h-[41px] rounded-bl-lg rounded-br-lg">
          Add To Cart
        </button>
      </div>

      {/* BOTTOM */}
      <div className="mt-2">
        <h1 className="font-semibold line-clamp-2">HAVIT HV-G92 Gamepad</h1>
        <div className="flex items-center gap-3 mt-1 font-medium">
          <p className="text-primary">$120</p>
          <p className="opacity-50">-5%</p>
        </div>

        <div className="mt-2 flex items-center gap-2">
          {Array(5)
            .fill(0)
            .map((index) => (
              <FaStar key={index} className="text-yellow-400" />
            ))}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
