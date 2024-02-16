import { Search } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  queryValue: string;
  className?: string;
  placeHolder?: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Searchbox = ({
  queryValue,
  className,
  handleSearch = () => {},
  placeHolder = "What are you looking for?",
}: Props) => {
  return (
    <div className="flex items-center bg-[#F5F5F5] border rounded-md p-3 w-full">
      <input
        type="text"
        value={queryValue}
        onChange={handleSearch}
        placeholder={placeHolder}
        className={twMerge(
          "w-full focus:outline-none max-w-full placeholder:text-sm bg-transparent",
          className
        )}
      />
      <Search className="flex-shrink-0 ml-[15px]" />
    </div>
  );
};

export default Searchbox;
