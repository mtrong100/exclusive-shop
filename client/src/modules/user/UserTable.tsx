import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Swal from "sweetalert2";
import { Trash } from "lucide-react";
import { UserDetailModal } from "./UserDetailModal";
import { format } from "timeago.js";
import { forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteUserApi, getAllUsersApi } from "@/services/userService";
import { storeUsers } from "@/redux/slices/userSlice";

const UserTable = forwardRef<HTMLTableElement>((_, ref) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = JSON.parse(localStorage.getItem("EXCLUSIVE_TOKEN") || "");
        await deleteUserApi(id, token);
        const data = await getAllUsersApi(token);
        dispatch(storeUsers(data?.docs));
        Swal.fire("Deleted!", "Data has been deleted.", "success");
      }
    });
  };

  return (
    <Table ref={ref}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="w-[200px]">Address</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Join</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((item) => (
          <TableRow key={item?._id}>
            <TableCell className="font-medium capitalize">
              {item?.name}
            </TableCell>
            <TableCell>{item?.email}</TableCell>
            <TableCell>{item?.address || "Not update yet"}</TableCell>
            <TableCell className="capitalize">
              {item?.phone || "Not update yet"}
            </TableCell>
            <TableCell>{format(item?.createdAt)}</TableCell>
            <TableCell className="capitalize flex opacity-50 items-center gap-5 justify-end">
              <UserDetailModal data={item} />
              <Trash
                onClick={() => handleDelete(item?._id)}
                size={22}
                className="cursor-pointer hover:text-primary"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default UserTable;
