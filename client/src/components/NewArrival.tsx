import TitleSection from "./TitleSection";
import playstation5 from "../assets/images/playstation5.png";
import womenHat from "../assets/images/women-hat.png";
import gucci from "../assets/images/gucci.png";
import speakers from "../assets/images/speakers.png";
import { Link } from "react-router-dom";

const NewArrival = () => {
  return (
    <div>
      <TitleSection>New Arrival</TitleSection>
      <div className="mt-[60px] grid grid-cols-2 items-start gap-[30px]">
        <div className="flex-1 bg-black text-white pt-[90px] px-[30px] relative rounded-md">
          <div className="w-[511px] h-[511px]">
            <img src={playstation5} alt="playstation5" />
          </div>

          <div className="absolute flex flex-col gap-4 bottom-8 left-8">
            <h1 className="text-2xl font-semibold">PlayStation 5</h1>
            <p className="max-w-[250px] w-full">
              Black and White version of the PS5 coming out on sale.
            </p>
            <Link
              to="/shop"
              className="font-semibold border-b border-white w-fit"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-[30px]  text-white">
          <div className="bg-black flex items-center justify-end gap-5 relative rounded-md">
            <div className="flex flex-col gap-4  flex-1 p-[24px] absolute bottom-3 left-3">
              <h1 className="text-2xl font-semibold">Women’s Collections</h1>
              <p className="max-w-[250px] w-full">
                Featured woman collections that give you another vibe.
              </p>
              <Link
                to="/shop"
                className="font-semibold border-b border-white w-fit"
              >
                Shop Now
              </Link>
            </div>

            <div className="w-[432px] h-[286px] flex-shrink-0">
              <img src={womenHat} alt="womenHat" className="img-cover" />
            </div>
          </div>

          <div className="grid grid-cols-2 items-start gap-[30px]">
            {/* SPEAKERS */}
            <div className="bg-black rounded-md relative p-[32px] flex-1">
              <div className="w-[190px] h-[221px]">
                <img src={speakers} alt="speakers" className="img-cover" />
              </div>

              <div className="absolute flex flex-col gap-2 left-4 bottom-4">
                <h1 className="text-2xl font-semibold">Speakers</h1>
                <p className="max-w-[250px] w-full">Amazon wireless speakers</p>
                <Link
                  to="/shop"
                  className="font-semibold border-b border-white w-fit"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* GUCCI */}
            <div className="bg-black rounded-md relative p-[32px] flex-1">
              <div className="w-[190px] h-[221px]">
                <img src={gucci} alt="speakers" className="img-cover" />
              </div>

              <div className="absolute flex flex-col gap-2 left-4 bottom-4">
                <h1 className="text-2xl font-semibold">Perfume</h1>
                <p className="max-w-[250px] w-full">GUCCI INTENSE OUD EDP</p>
                <Link
                  to="/shop"
                  className="font-semibold border-b border-white w-fit"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
