import { ArrowRight } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import iphoneBanner from "../assets/images/iphone-banner.png";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  loadingCategories,
  storeCategories,
} from "@/redux/slices/categorySlice";
import { getCategories } from "@/services/categoryService";
import { queryParams } from "@/constanst";
import { useEffect } from "react";

const Banner = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);

  useEffect(() => {
    async function fetchCategories() {
      try {
        dispatch(loadingCategories(true));
        const data = await getCategories(queryParams.PAGE, 9);
        dispatch(storeCategories(data?.docs));
      } catch (error) {
        console.log(error);
        dispatch(loadingCategories(false));
        dispatch(storeCategories([]));
      }
    }
    fetchCategories();
  }, [dispatch]);

  return (
    <section className="grid grid-cols-[220px_minmax(0,_1fr)] gap-5 ">
      {/* CATEGORY LIST */}
      <div className="border-r pt-5">
        <ul className="flex flex-col gap-4">
          {categories?.map((item) => (
            <li
              className="hover:border-black capitalize cursor-pointer w-fit border-b-transparent border-b"
              key={item?._id}
            >
              {item?.name}
            </li>
          ))}
        </ul>
      </div>

      {/* BANNER IMAGE */}
      <div className="py-4 flex items-center justify-center bg-black text-white gap-[38px] mt-5 rounded-md">
        <div className="flex-1 pl-[64px]">
          <div className="flex items-center gap-5 mb-2">
            <FaApple size={50} className="text-white" />
            <p>iPhone 14 Series</p>
          </div>

          <h1 className="text-[48px] tracking-wider font-semibold mb-[22px] leading-tight">
            Up to 10% off Voucher
          </h1>

          <div className="font-semibold flex items-center gap-2 ">
            <Link to="/shop" className="border-b border-white">
              Shop Now
            </Link>
            <ArrowRight size={20} />
          </div>
        </div>

        <div className="w-[496px] h-[352px]">
          <img src={iphoneBanner} alt="iphone-banner" className="img-cover" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
