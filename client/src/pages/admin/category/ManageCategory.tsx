import TitleSection from "@/components/TitleSection";
import Checkbox from "@/components/Checkbox";
import CategoryTable from "@/modules/category/CategoryTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TSortType } from "@/types/general-types";
import { sortTypes } from "@/constanst";
import { Search } from "lucide-react";
import { AddNewCategoryModal } from "@/modules/category/AddNewCategoryModal";
import useGetcategories from "@/modules/category/useGetcategories";

const ManageCategory = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState("desc");
  const { isLoading, categories } = useGetcategories();
  console.log(categories);

  return (
    <section>
      <div className="flex items-center justify-between">
        <TitleSection>Manage category</TitleSection>
        <AddNewCategoryModal />
      </div>

      <div className="mt-6 grid grid-cols-[minmax(0,_1fr)_250px] gap-[30px]">
        <div>
          <div className="flex items-center bg-[#F5F5F5] border rounded-md p-3 w-full">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full focus:outline-none max-w-full placeholder:text-sm bg-transparent"
            />
            <Search className="flex-shrink-0 ml-[15px]" />
          </div>

          <ul>
            <CategoryTable />
          </ul>
        </div>

        <div className="p-3 rounded-md shadow-md border h-fit">
          <h1 className="text-xl font-bold">Sắp xếp</h1>
          <ul className="mt-4 flex flex-col gap-3">
            {sortTypes.map((item: TSortType) => (
              <li
                key={item.title}
                onClick={() => setOrder(item.value)}
                className="flex items-center gap-3"
              >
                {order === item.value ? (
                  <Checkbox type="checked" />
                ) : (
                  <Checkbox />
                )}
                <p className="cursor-default">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ManageCategory;
