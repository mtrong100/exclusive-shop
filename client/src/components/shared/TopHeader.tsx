import { Link } from "react-router-dom";

const TopHeader = () => {
  return (
    <section className="h-[48px] bg-black flex text-white items-center justify-center max-w-[1920px] mx-auto">
      <div className="flex items-center gap-3">
        <p>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </p>
        <Link className="underline font-semibold" to="/shop">
          ShopNow
        </Link>
      </div>
    </section>
  );
};

export default TopHeader;
