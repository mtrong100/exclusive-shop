import Searchbox from "@/components/Searchbox";
import TitleSection from "@/components/TitleSection";
import useDebounce from "@/hooks/useDebounce";
import useOnchange from "@/hooks/useOnchange";
import UserTable from "@/modules/user/UserTable";
import { loadingUsers, storeUsers } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAllUsersApi } from "@/services/userService";
import { useEffect } from "react";

const ManageUser = () => {
  const dispatch = useAppDispatch();
  const { value, handleChange } = useOnchange();
  const searchQuery = useDebounce(value, 500);
  const { isLoading, users } = useAppSelector((state) => state.user);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      dispatch(loadingUsers(true));
      const token = JSON.parse(localStorage.getItem("EXCLUSIVE_TOKEN") || "");
      const data = await getAllUsersApi(token);
      dispatch(storeUsers(data));
    } catch (error) {
      console.log("Failed to fetch users", error);
      dispatch(loadingUsers(false));
      dispatch(storeUsers([]));
    }
  }

  // FILTER ORDERS
  const filterUsers = users.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <TitleSection>Manage user</TitleSection>

      <Searchbox handleSearch={handleChange} queryValue={value} />

      <ul>
        {!isLoading && filterUsers?.length === 0 ? (
          <p className="text-center font-medium my-5 opacity-60">
            No data found...
          </p>
        ) : (
          <UserTable users={filterUsers} />
        )}
      </ul>
    </section>
  );
};

export default ManageUser;
