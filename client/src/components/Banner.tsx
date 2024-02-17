import { ArrowRight } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import iphoneBanner from "../assets/images/iphone-banner.png";

const Banner = () => {
  return (
    <section>
      {/* BANNER IMAGE */}
      <div className="py-4 flex items-center justify-center bg-black text-white gap-[38px] mt-5 rounded-md">
        <div className="flex-1 pl-[64px]">
          <div className="flex items-center gap-5 mb-2">
            <FaApple size={50} className="text-white" />
            <p>iPhone 14 Series</p>
          </div>

          <h1 className="text-[48px] font-semibold mb-3 leading-tight">
            Up to 10% off Voucher
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            quis laborum ad, laudantium alias repellendus ducimus sint, dolorem
          </p>

          <div className="font-semibold flex items-center gap-2 mt-3">
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
