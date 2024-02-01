import playstation5 from "../assets/images/playstation5.png";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { queryParams } from "@/constanst";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import useOnchange from "@/hooks/useOnchange";
import useDebounce from "@/hooks/useDebounce";
import { loadingProducts, storeProducts } from "@/redux/slices/productSlice";
import {
  getAllProductsApi,
  getProductByCategoryApi,
} from "@/services/productService";
import ReactPaginate from "react-paginate";
import CategoryCombobox from "./admin/category/CategoryCombobox";
import Searchbox from "@/components/Searchbox";
import ProductList from "@/modules/product/ProductList";

const Shop = () => {
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
    <section className="mt-5 mb-[140px]">
      {/* BANNER */}
      <div className="grid grid-cols-2 rounded-md py-5 px-10 gap-10 items-center bg-black text-white">
        <div>
          <h1 className="text-6xl font-bold tracking-wide leading-tight">
            Explore our products
          </h1>
          <p className="mt-6">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div>
          <img src={playstation5} alt="playstation5" className="img-cover" />
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex items-center gap-5">
        {/* SORT CATEGORY */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <h1 className="flex-shrink-0">Find category</h1>
          <CategoryCombobox
            className="w-[400px]"
            category={category}
            setCategory={setCategory}
          />
        </div>

        <Searchbox queryValue={value} handleSearch={handleChange} />
      </div>

      <div>
        {!isLoading && products?.length === 0 ? (
          <p className="text-center font-medium my-5 opacity-60">
            No data found...
          </p>
        ) : (
          <ProductList isLoading={isLoading} products={products} />
        )}
      </div>

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

export default Shop;
