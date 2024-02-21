import { menuDropdown, navLinks } from "@/constanst";
import { TMenuDropdown, TNavLink } from "@/types/general-types";
import {
  Heart,
  LayoutDashboard,
  LogOut,
  Search,
  ShoppingCart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "../auth-context";
import { useCart } from "../cart-context";

const Header = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { cart } = useCart();
  const location = useLocation();

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("EXCLUSIVE_USER");
    localStorage.removeItem("EXCLUSIVE_TOKEN");
  };

  return (
    <header className="p-5 border-b max-w-[1920px] mx-auto sticky top-0 bg-white z-50">
      <div className="w-full max-w-[1190px] mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="font-bold text-3xl">
          Exclusive
        </Link>

        {/* NAV-LINKS */}
        <ul className="flex items-center gap-[48px]">
          {navLinks.map((item: TNavLink) => {
            const isActive = item.path === location.pathname;

            return (
              <Link
                to={item.path}
                key={item.title}
                className={`${
                  isActive
                    ? "font-medium border-b border-black"
                    : "font-normal hover:border-b hover:border-black"
                }  cursor-pointer`}
              >
                {item.title}
              </Link>
            );
          })}
        </ul>

        {/* SEARCH-BOX & ICONS */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#F5F5F5] rounded-md p-3 w-full">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full focus:outline-none max-w-full placeholder:text-sm bg-transparent"
            />
            <Search className="flex-shrink-0 ml-[15px]" />
          </div>

          <div className="flex items-center gap-4">
            {/* GO TO WISHLIST PAGE */}
            <Link to="/wishlist" className="relative">
              <Heart size={25} />

              <span className="absolute -top-1 -right-1 w-[16px] h-[16px] flex items-center justify-center rounded-full bg-primary text-white text-xs">
                {currentUser?.favorites?.length || 0}
              </span>
            </Link>

            {/* GO TO CART PAGE */}
            <Link to="/cart" className="relative">
              <ShoppingCart size={25} />

              <span className="absolute -top-1 -right-1 w-[16px] h-[16px] flex items-center justify-center rounded-full bg-primary text-white text-xs">
                {cart?.length || 0}
              </span>
            </Link>
          </div>

          {/* USER AVATAR */}
          {currentUser && (
            <Popover>
              <PopoverTrigger asChild>
                <div className="w-[30px] h-[30px] border rounded-full flex-shrink-0 cursor-pointer">
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="img-cover rounded-full"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="absolute -right-5 w-[190px] rounded-md p-1">
                <ul className="flex flex-col">
                  {currentUser && currentUser.isAdmin && (
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 h-[45px] hover:bg-gray-200 pl-3 rounded-md"
                    >
                      <LayoutDashboard size={20} />
                      Dashboard
                    </Link>
                  )}

                  {menuDropdown.map((item: TMenuDropdown) => (
                    <Link
                      key={item.title}
                      to={item.path}
                      className="flex items-center gap-3 h-[45px] hover:bg-gray-200 pl-3 rounded-md"
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  ))}

                  <li
                    onClick={handleLogout}
                    className="flex items-center gap-3 h-[45px] cursor-pointer hover:bg-gray-200 pl-3 rounded-md"
                  >
                    <LogOut size={20} />
                    Logout
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
