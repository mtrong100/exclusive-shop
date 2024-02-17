import Searchbox from "@/components/Searchbox";
import TitleSection from "@/components/TitleSection";
import { useAuth } from "@/components/auth-context";
import useDebounce from "@/hooks/useDebounce";
import useOnchange from "@/hooks/useOnchange";
import OrderTable from "@/modules/order/OrderTable";
import { getUserOrdersApi } from "@/services/orderService";
import { TOrder } from "@/types/main-types";
import { useEffect, useState } from "react";

const MyOrder = () => {
  const { currentUser } = useAuth();
  const [myOrders, setMyOrders] = useState<TOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { value, handleChange } = useOnchange();
  const searchQuery = useDebounce(value, 500);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  // FETCH MY ORDERS
  async function fetchMyOrders() {
    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("EXCLUSIVE_TOKEN") || "");
      const data = await getUserOrdersApi(token, currentUser?._id as string);
      setMyOrders(data);
      setIsLoading(false);
    } catch (error) {
      console.log("Failed to fetch my orders", error);
      setMyOrders([]);
      setIsLoading(false);
    }
  }

  // FILTER ORDERS
  const filterOrders = myOrders.filter((item) =>
    item?._id.includes(searchQuery)
  );

  return (
    <section className="mt-10 mb-20">
      <TitleSection>My Orders</TitleSection>

      <div className="mt-5">
        <Searchbox
          handleSearch={handleChange}
          queryValue={value}
          placeHolder="Enter order ID..."
        />
      </div>

      <ul>
        {!isLoading && filterOrders?.length === 0 ? (
          <p className="text-center font-medium my-5 opacity-60">
            No data found...
          </p>
        ) : (
          <OrderTable orders={filterOrders} />
        )}
      </ul>
    </section>
  );
};

export default MyOrder;
