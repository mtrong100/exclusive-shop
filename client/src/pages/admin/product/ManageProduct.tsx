import Checkbox from "@/components/Checkbox";
import ComboboxRoot from "@/components/ComboboxRoot";
import TitleSection from "@/components/TitleSection";
import { Button } from "@/components/ui/button";
import { demoCategories, sortTypes } from "@/constanst";
import ProductTable from "@/modules/product/ProductTable";
import { TSortType } from "@/types/general-types";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageProduct = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("");
  const [order, setOrder] = useState("desc");

  return (
    <section>
      <div className="flex items-center justify-between">
        <TitleSection>Manage product</TitleSection>
        <Button onClick={() => navigate("/manage-product/add-new")}>
          <Plus className="mr-2 h-4 w-4" /> Add new product
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-[minmax(0,_1fr)_250px] items-start gap-[30px]">
        <div>
          <div className="flex items-center gap-5 ">
            {/* SORT CATEGORY */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <h1 className="flex-shrink-0">Find category</h1>
              <ComboboxRoot
                data={demoCategories}
                value={category}
                setValue={setCategory}
                className="max-w-[250px]"
              />
            </div>

            {/* SEARCH-BOX */}
            <div className="flex items-center bg-[#F5F5F5] border rounded-md p-3 w-full">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full focus:outline-none max-w-full placeholder:text-sm bg-transparent"
              />
              <Search className="flex-shrink-0 ml-[15px]" />
            </div>
          </div>

          <ProductTable />
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

export default ManageProduct;
