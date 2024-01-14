import { Button } from "./ui/button";
import boomBox from "../assets/images/boombox.png";
import { useNavigate } from "react-router-dom";

const EnhanceBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black rounded-md px-[56px] py-[69px] flex items-center justify-between ">
      <div>
        <span className="text-primary text-lg font-semibold inline-block mb-5">
          Categories
        </span>
        <h1 className="text-white font-semibold text-[48px] tracking-wider leading-tight">
          Enhance Your Music Experience
        </h1>
        <Button
          onClick={() => navigate("/shop")}
          className="h-[50px] px-10 mt-8"
        >
          Buy Now!
        </Button>
      </div>

      <div className="w-[568px] h-[330px] flex-shrink-0">
        <img src={boomBox} alt="boomBox" className="img-cover" />
      </div>
    </div>
  );
};

export default EnhanceBanner;
