import ExploreOurProduct from "@/ExploreOurProduct";
import Banner from "@/components/Banner";
import BestSellingProducts from "@/components/BestSellingProducts";
import BrowseByCategory from "@/components/BrowseByCategory";
import EnhanceBanner from "@/components/EnhanceBanner";
import FlashSale from "@/components/FlashSale";
import NewArrival from "@/components/NewArrival";
import Service from "@/components/Service";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

const Home = () => {
  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section>
      <Banner />
      <div className="mt-20">
        <FlashSale />
      </div>
      <Separator className="my-12" />
      <div className="mt-20">
        <BrowseByCategory />
      </div>
      <Separator className="my-12" />
      <div className="mt-20">
        <BestSellingProducts />
      </div>
      <div className="mt-[140px]">
        <EnhanceBanner />
      </div>
      <div className="mt-[81px]">
        <ExploreOurProduct />
      </div>
      <div className="mt-[150px]">
        <NewArrival />
      </div>
      <div className="mt-[140px]">
        <Service />
      </div>
    </section>
  );
};

export default Home;
