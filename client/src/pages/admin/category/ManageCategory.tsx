import TitleSection from "@/components/TitleSection";
import Checkbox from "@/components/Checkbox";
import CategoryTable from "@/modules/category/CategoryTable";
import { useEffect, useState } from "react";
import { TSortType } from "@/types/general-types";
import { queryParams, sortTypes } from "@/constanst";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { AddNewCategoryModal } from "@/modules/category/AddNewCategoryModal";
import useOnchange from "@/hooks/useOnchange";
import useDebounce from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ReactPaginate from "react-paginate";
import {
  loadingCategories,
  storeCategories,
} from "@/redux/slices/categorySlice";
import { getCategories } from "@/services/categoryService";

const ManageCategory = () => {
  const dispatch = useAppDispatch();
  const { isLoading, categories } = useAppSelector((state) => state.category);

  const [order, setOrder] = useState("desc");
  const [nextPage, setNextPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { value, handleChange } = useOnchange();
  const searchQuery = useDebounce(value, 500);

  // FETCH DATA
  useEffect(() => {
    async function fetchData() {
      dispatch(loadingCategories(true));

      try {
        const data = await getCategories(
          nextPage,
          queryParams.LIMIT,
          order,
          searchQuery
        );

        setTotalPages(data?.totalPages);
        dispatch(storeCategories(data?.docs));
      } catch (error) {
        dispatch(storeCategories([]));
        dispatch(loadingCategories(false));
        setTotalPages(1);
      }
    }
    fetchData();
  }, [dispatch, nextPage, order, searchQuery]);

  // CLICK PAGE
  const handlePageClick = (event: { selected: number }) => {
    setNextPage(event.selected + 1);
  };

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

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
              value={value}
              onChange={handleChange}
              type="text"
              placeholder="What are you looking for?"
              className="w-full focus:outline-none max-w-full placeholder:text-sm bg-transparent"
            />
            <Search className="flex-shrink-0 ml-[15px]" />
          </div>

          <ul>
            {!isLoading && categories?.length === 0 ? (
              <p className="text-center font-medium my-5 opacity-60">
                No data found...
              </p>
            ) : (
              <CategoryTable />
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
            />
          </div>
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
