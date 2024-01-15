import { IoIosCheckmark } from "react-icons/io";
import { twMerge } from "tailwind-merge";

const Checkbox = ({ type = "uncheck", className = "" }) => {
  const typeClasses = {
    uncheck: " border-2 border-border",
    checked: "bg-primary text-white",
  };

  return (
    <div
      className={twMerge(
        `${
          typeClasses[type as keyof typeof typeClasses]
        } rounded-lg w-[25px] h-[25px] cursor-default`,
        className
      )}
    >
      {type === "checked" && <IoIosCheckmark size={25} />}
    </div>
  );
};

export default Checkbox;
