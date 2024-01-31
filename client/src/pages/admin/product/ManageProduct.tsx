import Checkbox from "@/components/Checkbox";
import TitleSection from "@/components/TitleSection";
import { Button } from "@/components/ui/button";
import { queryParams, sortTypes } from "@/constanst";
import ProductTable from "@/modules/product/ProductTable";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TSortType } from "@/types/general-types";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCombobox from "../category/CategoryCombobox";
import useDebounce from "@/hooks/useDebounce";
import useOnchange from "@/hooks/useOnchange";
import { loadingProducts, storeProducts } from "@/redux/slices/productSlice";
import {
  getAllProductsApi,
  getProductByCategoryApi,
} from "@/services/productService";
import ReactPaginate from "react-paginate";

const ManageProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, products } = useAppSelector((state) => state.product);

  const [category, setCategory] = useState<string>("");
  const [order, setOrder] = useState("desc");
  const [nextPage, setNextPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { value, handleChange } = useOnchange();
  const searchQuery = useDebounce(value, 500);

  // FETCH DATA
  useEffect(() => {
    async function fetchData() {
      dispatch(loadingProducts(true));

      try {
        let data;

        if (category) {
          data = await getProductByCategoryApi(
            nextPage,
            queryParams.LIMIT,
            order,
            searchQuery,
            category
          );
        } else {
          data = await getAllProductsApi(
            nextPage,
            queryParams.LIMIT,
            order,
            searchQuery
          );
        }

        setTotalPages(data?.totalPages);
        dispatch(storeProducts(data?.docs));
      } catch (error) {
        console.log(error);
        dispatch(storeProducts([]));
        dispatch(loadingProducts(false));
        setTotalPages(1);
      }
    }
    fetchData();
  }, [category, dispatch, nextPage, order, searchQuery]);

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
              <CategoryCombobox
                className="w-[400px]"
                category={category}
                setCategory={setCategory}
              />
            </div>

            {/* SEARCH-BOX */}
            <div className="flex items-center bg-[#F5F5F5] border rounded-md p-3 w-full">
              <input
                type="text"
                value={value}
                placeholder="What are you looking for?"
                onChange={handleChange}
                className="w-full focus:outline-none max-w-full placeholder:text-sm bg-transparent"
              />
              <Search className="flex-shrink-0 ml-[15px]" />
            </div>
          </div>

          <ul>
            {!isLoading && products?.length === 0 ? (
              <p className="text-center font-medium my-5 opacity-60">
                No data found...
              </p>
            ) : (
              <ProductTable />
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
