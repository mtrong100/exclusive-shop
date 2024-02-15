import Checkbox from "@/components/Checkbox";
import TitleSection from "@/components/TitleSection";
import { sortOrder } from "@/constanst";
import OrderTable from "@/modules/order/OrderTable";
import { TSortOrder } from "@/types/general-types";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageOrder = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState("desc");

  return (
    <section>
      <TitleSection>Manage order</TitleSection>

      <div className="mt-6 grid grid-cols-[minmax(0,_1fr)_250px] gap-[30px]">
        <div>
          {/* SEARCH-BOX */}
          <div className="flex items-center bg-[#F5F5F5] border rounded-md p-3 w-full">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full focus:outline-none max-w-full placeholder:text-sm bg-transparent"
            />
            <Search className="flex-shrink-0 ml-[15px]" />
          </div>
          <ul>
            <OrderTable />
          </ul>
        </div>

        <div className="p-3 rounded-md shadow-md border h-fit">
          <h1 className="text-xl font-bold">Sắp xếp</h1>
          <ul className="mt-4 flex flex-col gap-3">
            {sortOrder.map((item: TSortOrder) => (
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

export default ManageOrder;
