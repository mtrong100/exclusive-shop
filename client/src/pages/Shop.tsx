import ComboboxRoot from "@/components/ComboboxRoot";
import playstation5 from "../assets/images/playstation5.png";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const demoCategories: string[] = [
  "electronics",
  "clothing",
  "home and kitchen",
  "books",
  "sports and outdoors",
  "beauty and personal care",
  "toys and games",
  "automotive",
  "health and household",
  "grocery",
];

const Shop = () => {
  const [category, setCategory] = useState<string>();

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="mt-5 mb-[140px]">
      <div className="grid grid-cols-2 rounded-md py-5 px-10 gap-10 items-center bg-black text-white">
        <div>
          <h1 className="text-6xl font-bold tracking-wide leading-tight">
            Explore our products
          </h1>
          <p className="mt-6">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div>
          <img src={playstation5} alt="playstation5" className="img-cover" />
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex items-center gap-5">
        {/* SORT CATEGORY */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <h1 className="flex-shrink-0">Find category</h1>
          <ComboboxRoot
            data={demoCategories}
            value={category}
            setValue={setCategory}
            className="max-w-[250px]"
          />
        </div>

        {/* SEARCH-BOX */}
        <div className="flex items-center bg-[#F5F5F5] border rounded-md p-3 w-full">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full focus:outline-none max-w-full placeholder:text-sm bg-transparent"
          />
          <Search className="flex-shrink-0 ml-[15px]" />
        </div>
      </div>

      <ul className="grid grid-cols-4 gap-x-[30px] gap-y-[60px] mt-8">
        {Array(12)
          .fill(0)
          .map((item, index) => (
            <ProductCard key={index} />
          ))}
      </ul>
    </section>
  );
};

export default Shop;
