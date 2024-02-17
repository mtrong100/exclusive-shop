import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Trash } from "lucide-react";
import { UserDetailModal } from "./UserDetailModal";
import { TUser } from "@/types/main-types";
import { format } from "timeago.js";

const UserTable = ({ users = [] }: { users: TUser[] }) => {
  return (
    <Table>
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
              {/* <Trash size={22} className="cursor-pointer hover:text-primary" /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
