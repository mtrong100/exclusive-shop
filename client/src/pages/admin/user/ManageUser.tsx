import Checkbox from "@/components/Checkbox";
import Searchbox from "@/components/Searchbox";
import TitleSection from "@/components/TitleSection";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { queryParams, sortOrder } from "@/constanst";
import useDebounce from "@/hooks/useDebounce";
import useOnchange from "@/hooks/useOnchange";
import UserTable from "@/modules/user/UserTable";
import { loadingUsers, storeUsers } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAllUsersApi } from "@/services/userService";
import { TSortOrder } from "@/types/general-types";
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import ReactPaginate from "react-paginate";

const sortOptions: TSortOrder[] = [
  {
    title: "Name",
    value: "name",
  },
  {
    title: "Email",
    value: "email",
  },
  {
    title: "Address",
    value: "address",
  },
  {
    title: "Phone",
    value: "phone",
  },
];

const ManageUser = () => {
  const dispatch = useAppDispatch();
  const { isLoading, users } = useAppSelector((state) => state.user);
  const [order, setOrder] = useState<string>("desc");
  const [sort, setSort] = useState<string>("name");
  const [nextPage, setNextPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { value, handleChange } = useOnchange();
  const searchQuery = useDebounce(value, 500);
  const userTableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        dispatch(loadingUsers(true));
        const token = JSON.parse(localStorage.getItem("EXCLUSIVE_TOKEN") || "");
        const data = await getAllUsersApi(
          token,
          nextPage,
          queryParams.LIMIT,
          sort,
          order,
          searchQuery
        );

        setTotalPages(data?.totalPages);
        dispatch(storeUsers(data?.docs));
      } catch (error) {
        console.log("Failed to fetch users", error);
        dispatch(loadingUsers(false));
        dispatch(storeUsers([]));
        setTotalPages(1);
      }
    }
    fetchUsers();
  }, [dispatch, nextPage, order, searchQuery, sort]);

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
      <TitleSection>Manage user</TitleSection>

      <div className="my-5 flex items-center gap-2">
        <Searchbox handleSearch={handleChange} queryValue={value} />
        <Popover>
          <PopoverTrigger asChild>
            <span className="flex items-center justify-center w-[60px] h-[50px] rounded-sm bg-muted hover:bg-gray-200">
              <ListFilter size={25} />
            </span>
          </PopoverTrigger>
          <PopoverContent className="absolute -right-5 w-[300px] rounded-md p-1 z-10 bg-white shadow-md border">
            <div className="p-3 flex flex-col gap-3">
              <section>
                <h1 className="text-xl font-bold">Filter</h1>
                <ul className="mt-2 grid grid-cols-2 gap-3">
                  {sortOptions.map((item: TSortOrder) => (
                    <li
                      key={item.title}
                      onClick={() => setSort(item.value)}
                      className="flex items-center gap-3"
                    >
                      {sort === item.value ? (
                        <Checkbox type="checked" />
                      ) : (
                        <Checkbox />
                      )}
                      <p className="cursor-default">{item.title}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
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
                filename="User table"
                sheet="User"
                currentTableRef={userTableRef.current}
              >
                <Button className="w-full ">Export to excel</Button>
              </DownloadTableExcel>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <ul>
        {!isLoading && users?.length === 0 ? (
          <p className="text-center font-medium my-5 opacity-60">
            No data found...
          </p>
        ) : (
          <UserTable ref={userTableRef} />
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

export default ManageUser;
