import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { storeProducts } from "@/redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteProductApi, getAllProductsApi } from "@/services/productService";
import { displayPrice, displayRating } from "@/utils/helper";
import { Eye, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

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
        await deleteProductApi(id, token);
        const data = await getAllProductsApi();
        dispatch(storeProducts(data?.docs));
        Swal.fire("Deleted!", "Data has been deleted.", "success");
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead className="w-[250px]">Category</TableHead>
          <TableHead className="w-[150px]">Price</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((item) => (
          <TableRow key={item?._id}>
            <TableCell className="capitalize">{item?.name}</TableCell>
            <TableCell className="capitalize">{item?.category}</TableCell>
            <TableCell>{displayPrice(item?.price)}</TableCell>
            <TableCell>{displayRating(item?.rating)}</TableCell>
            <TableCell>
              <div className="flex opacity-50 items-center gap-5 justify-end">
                <Eye
                  onClick={() => navigate(`/product/${8275}`)}
                  size={22}
                  className="cursor-pointer hover:text-primary"
                />
                <Pencil
                  onClick={() => navigate(`/manage-product/edit/${item?._id}`)}
                  size={22}
                  className="cursor-pointer hover:text-primary"
                />
                <Trash
                  onClick={() => handleDelete(item?._id)}
                  size={22}
                  className="cursor-pointer hover:text-primary"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
