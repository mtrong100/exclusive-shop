import Checkbox from "@/components/Checkbox";
import Searchbox from "@/components/Searchbox";
import TitleSection from "@/components/TitleSection";
import { queryParams, sortOrder } from "@/constanst";
import useDebounce from "@/hooks/useDebounce";
import useOnchange from "@/hooks/useOnchange";
import OrderTable from "@/modules/order/OrderTable";
import { TSortOrder } from "@/types/general-types";
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { loadingOrder, storeOrders } from "@/redux/slices/orderSlice";
import { getAllOrdersApi } from "@/services/orderService";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Button } from "@/components/ui/button";

const ManageOrder = () => {
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<string>("desc");
  const [nextPage, setNextPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { value, handleChange } = useOnchange();
  const searchQuery = useDebounce(value, 500);
  const { isLoading, orders } = useAppSelector((state) => state.order);
  const orderTableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [dispatch, nextPage, order, searchQuery]);

  // FETCH ORDERS
  async function fetchOrders() {
    try {
      dispatch(loadingOrder(true));
      const token = JSON.parse(localStorage.getItem("EXCLUSIVE_TOKEN") || "");
      const data = await getAllOrdersApi(
        token,
        nextPage,
        queryParams.LIMIT,
        order
      );
      setTotalPages(data?.totalPages);
      dispatch(storeOrders(data?.docs));
      dispatch(loadingOrder(false));
    } catch (error) {
      console.log(error);
      dispatch(storeOrders([]));
      dispatch(loadingOrder(false));
      setTotalPages(1);
    }
  }

  // FILTER ORDERS
  const filterOrders = orders.filter((item) => item?._id.includes(searchQuery));

  // CLICK PAGE
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    setNextPage(event.selected + 1);
  };

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section>
      <TitleSection>Manage order</TitleSection>

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
    </section>
  );
};

export default ManageOrder;
