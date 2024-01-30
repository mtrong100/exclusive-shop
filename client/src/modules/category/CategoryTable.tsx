import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import Swal from "sweetalert2";
import { EditCategoryModal } from "./EditCategoryModal";
import { format } from "timeago.js";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteCategoryApi, getCategories } from "@/services/categoryService";
import { storeCategories } from "@/redux/slices/categorySlice";

const CategoryTable = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);

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
        await deleteCategoryApi(id, token);
        const data = await getCategories();
        dispatch(storeCategories(data?.docs));
        Swal.fire("Deleted!", "Data has been deleted.", "success");
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead className="w-[300px] text-center">Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map((item) => (
          <TableRow>
            <TableCell className="capitalize">{item?.name}</TableCell>
            <TableCell className="text-center">
              {format(item?.createdAt)}
            </TableCell>
            <TableCell className="capitalize flex opacity-50 items-center gap-5 justify-end">
              <EditCategoryModal item={item} />
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
};

export default CategoryTable;
