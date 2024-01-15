import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductTable = () => {
  const navigate = useNavigate();

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
        {Array(4)
          .fill(0)
          .map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium capitalize">
                LCD Monitor
              </TableCell>
              <TableCell className="capitalize">electronics</TableCell>
              <TableCell>$650</TableCell>
              <TableCell>5</TableCell>
              <TableCell className="capitalize flex opacity-50 items-center gap-5 justify-end">
                <Eye
                  onClick={() => navigate(`/product/${8275}`)}
                  size={22}
                  className="cursor-pointer hover:text-primary"
                />
                <Pencil
                  onClick={() => navigate(`/manage-product/edit/${8275}`)}
                  size={22}
                  className="cursor-pointer hover:text-primary"
                />
                <Trash
                  onClick={() => handleDelete("768")}
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

export default ProductTable;
