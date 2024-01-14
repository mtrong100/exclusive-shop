import React, { useState } from "react";
import { useParams } from "react-router-dom";
import whiteConsole from "../assets/images/white-console.png";
import { FaStar } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Heart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productSizes } from "@/constanst";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import TitleSection from "@/components/TitleSection";
import { ProductCarousel } from "@/components/ProductCarousel";

const ProducDetail = () => {
  const { id } = useParams();
  const [size, setSize] = useState<string>("");

  return (
    <section className="mt-[80px] mb-[140px]">
      <div className="grid grid-cols-[700px_minmax(0,_1fr)] gap-[70px] items-start">
        {/* PRODUCT IMAGES */}
        <div className="grid grid-cols-[170px_minmax(0,_1fr)] gap-[30px]">
          <div className="flex flex-col gap-[16px]">
            {Array(4)
              .fill(0)
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-[#F5F5F5] flex items-center justify-center h-[138px]"
                >
                  <img
                    src={whiteConsole}
                    alt="whiteConsole"
                    className="w-[112px] h-[97px]"
                  />
                </div>
              ))}
          </div>

          <div className="bg-[#F5F5F5] flex items-center justify-center px-[27px]">
            <img src={whiteConsole} alt="whiteConsole" className="" />
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div>
          <div>
            <h1 className="text-2xl font-semibold mb-[16px]">
              Havic HV G-92 Gamepad
            </h1>

            <div className=" flex items-center gap-2">
              {Array(5)
                .fill(0)
                .map((index) => (
                  <FaStar key={index} className="text-yellow-400" />
                ))}
            </div>

            <p className="text-3xl mt-[16px]">$192.00</p>

            <p className="mt-[24px]">
              PlayStation 5 Controller Skin High quality vinyl with air channel
              adhesive for easy bubble free install & mess free removal Pressure
              sensitive.
            </p>
          </div>

          <Separator className="my-5" />

          <div className="flex flex-col gap-[24px]">
            {/* COLORS */}
            <div className="flex items-center gap-3">
              <span>Colors</span>
              <RadioGroup className="flex items-center gap-2">
                <RadioGroupItem value="red" className="bg-yellow-500" />
                <RadioGroupItem value="green" className="bg-green-500" />
                <RadioGroupItem value="blue" className="bg-blue-500" />
              </RadioGroup>
            </div>

            {/* SIZES */}
            <div className="flex items-center gap-3">
              <span>Size:</span>
              <div className="flex items-center gap-4">
                {productSizes.map((item: string) => (
                  <span
                    onClick={() => setSize(item)}
                    key={item}
                    className={`${
                      size === item
                        ? "bg-primary text-white"
                        : "hover:bg-primary/10"
                    } flex  cursor-default items-center justify-center rounded-lg w-[35px] h-[35px] border`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* ACTION */}
            <div className="flex items-center gap-5">
              {/* INCREASE & DECREASE */}
              <div className="border border-black flex items-center rounded-lg">
                <span className="border-r border-black w-[40px] h-[44px] flex items-center justify-center cursor-pointer">
                  <Minus size={18} />
                </span>
                <span className="w-[80px] font-medium text-lg flex items-center justify-center">
                  2
                </span>
                <span className="border-l bg-primary text-white cursor-pointer border-black w-[40px] h-[44px] flex items-center justify-center">
                  <Plus size={18} />
                </span>
              </div>

              <Button className="h-[45px] px-10">Buy Now</Button>

              <div className="flex items-center justify-center rounded-lg border border-black w-[40px] h-[40px] cursor-pointer hover:bg-primary/10">
                <Heart />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-[150px]">
        <TitleSection>Related Item</TitleSection>
        <ul className="flex items-center gap-[30px] mt-[60px]">
          <ProductCarousel />
        </ul>
      </div>
    </section>
  );
};

export default ProducDetail;
