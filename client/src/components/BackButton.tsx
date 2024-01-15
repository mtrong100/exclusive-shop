import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface Props {
  path?: string;
  className?: string;
}

const BackButton = ({ path = "/dashboard", className = "" }: Props) => {
  return (
    <div className="absolute left-12 top-20">
      <Link
        to={path}
        className={twMerge(
          "w-[40px] h-[40px] flex items-center justify-center rounded-full bg-primary text-white hover:opacity-90",
          className
        )}
      >
        <ArrowLeft size={20} />
      </Link>
    </div>
  );
};

export default BackButton;
