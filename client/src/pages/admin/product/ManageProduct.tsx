import Checkbox from "@/components/Checkbox";
import TitleSection from "@/components/TitleSection";
import { Button } from "@/components/ui/button";
import { queryParams, sortOrder } from "@/constanst";
import ProductTable from "@/modules/product/ProductTable";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TSortOrder } from "@/types/general-types";
import {
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Plus,
  Search,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { DownloadTableExcel } from "react-export-table-to-excel";

const sortProductType: TSortOrder[] = [
  {
    title: "Name",
    value: "name",
  },
  {
    title: "Price",
    value: "price",
  },
  {
    title: "Category",
    value: "category",
  },
  {
    title: "Sold",
    value: "sold",
  },
  {
    title: "Rating",
    value: "rating",
  },
  {
    title: "Stock",
    value: "stock",
  },
];

const ManageProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, products } = useAppSelector((state) => state.product);
  const productTableRef = useRef<HTMLTableElement | null>(null);
  const [category, setCategory] = useState<string>("");
  const [order, setOrder] = useState<string>("desc");
  const [sort, setSort] = useState<string>("name");
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
            sort,
            order,
            searchQuery,
            category
          );
        } else {
          data = await getAllProductsApi(
            nextPage,
            queryParams.LIMIT,
            sort,
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
  }, [category, dispatch, nextPage, order, searchQuery, sort]);

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

      <div className="mt-8  grid-cols-[minmax(0,_1fr)_250px] items-start gap-[30px]">
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
                onChange={handleChange}
                placeholder="What are you looking for?"
                className="w-full focus:outline-none max-w-full placeholder:text-sm bg-transparent"
              />
              <Search className="flex-shrink-0 ml-[15px]" />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <span className="flex items-center justify-center w-[75px] h-[50px] rounded-sm bg-muted hover:bg-gray-200">
                  <ListFilter size={25} />
                </span>
              </PopoverTrigger>
              <PopoverContent className="absolute -right-5 w-[300px] rounded-md p-1 z-10 bg-white shadow-md border">
                <div className="p-3 flex flex-col gap-3">
                  <section>
                    <h1 className="text-xl font-bold">Filter</h1>
                    <ul className="mt-2 grid grid-cols-2 gap-3">
                      {sortProductType.map((item: TSortOrder) => (
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
                    filename="Product table"
                    sheet="Product"
                    currentTableRef={productTableRef.current}
                  >
                    <Button className="w-full ">Export to excel</Button>
                  </DownloadTableExcel>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <ul>
            {!isLoading && products?.length === 0 ? (
              <p className="text-center font-medium my-5 opacity-60">
                No data found...
              </p>
            ) : (
              <ProductTable ref={productTableRef} />
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
      </div>
    </section>
  );
};

export default ManageProduct;
