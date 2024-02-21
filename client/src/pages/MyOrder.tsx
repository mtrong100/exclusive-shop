import Searchbox from "@/components/Searchbox";
import TitleSection from "@/components/TitleSection";
import { useAuth } from "@/components/auth-context";
import { queryParams, sortOrder } from "@/constanst";
import useDebounce from "@/hooks/useDebounce";
import useOnchange from "@/hooks/useOnchange";
import OrderTable from "@/modules/order/OrderTable";
import { getUserOrdersApi } from "@/services/orderService";
import { TOrder } from "@/types/main-types";
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { DownloadTableExcel } from "react-export-table-to-excel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Checkbox from "@/components/Checkbox";
import { TSortOrder } from "@/types/general-types";
import { Button } from "@/components/ui/button";

const MyOrder = () => {
  const { currentUser } = useAuth();
  const [myOrders, setMyOrders] = useState<TOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<string>("desc");
  const [nextPage, setNextPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { value, handleChange } = useOnchange();
  const searchQuery = useDebounce(value, 500);
  const orderTableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    fetchMyOrders();
  }, [currentUser?._id, nextPage, order]);

  // FETCH MY ORDERS
  async function fetchMyOrders() {
    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("EXCLUSIVE_TOKEN") || "");
      const data = await getUserOrdersApi(
        token,
        currentUser?._id as string,
        nextPage,
        queryParams.LIMIT,
        order
      );
      setMyOrders(data?.docs);
      setTotalPages(data?.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.log("Failed to fetch my orders", error);
      setMyOrders([]);
      setIsLoading(false);
      setTotalPages(1);
    }
  }

  // CLICK PAGE
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    setNextPage(event.selected + 1);
  };

  // FILTER ORDERS
  const filterOrders = myOrders.filter((item) =>
    item?._id.includes(searchQuery)
  );

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="mt-10 mb-20">
      <TitleSection>My Orders</TitleSection>

      <div className="mt-6 flex items-center gap-3">
        <Searchbox
          handleSearch={handleChange}
          queryValue={value}
          placeHolder="Enter order ID..."
        />

        <Popover>
          <PopoverTrigger asChild>
            <span className="flex items-center justify-center w-[60px] h-[50px] rounded-sm bg-muted hover:bg-gray-200">
              <ListFilter size={25} />
            </span>
          </PopoverTrigger>
          <PopoverContent className="absolute -right-5 w-[250px] rounded-md p-3 z-10 bg-white shadow-md border">
            <section className="mb-4">
              <h1 className="text-xl font-bold">Order</h1>
              <ul className="mt-2 flex flex-col gap-3">
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
            </section>

            <DownloadTableExcel
              filename="Order table"
              sheet="Order"
              currentTableRef={orderTableRef.current}
            >
              <Button className="w-full ">Export to excel</Button>
            </DownloadTableExcel>
          </PopoverContent>
        </Popover>
      </div>

      <ul>
        {!isLoading && filterOrders?.length === 0 ? (
          <p className="text-center font-medium my-5 opacity-60">
            No data found...
          </p>
        ) : (
          <OrderTable orders={filterOrders} ref={orderTableRef} />
        )}
      </ul>

      {/* react-paginate */}
      {filterOrders?.length > queryParams.LIMIT && (
        <div className="mt-8 mb-3">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<ChevronRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel={<ChevronLeft />}
            renderOnZeroPageCount={null}
            forcePage={currentPage}
          />
        </div>
      )}
    </section>
  );
};

export default MyOrder;
