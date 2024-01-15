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
import { OrderDetailModal } from "./OrderDetailModal";

const OrderTable = () => {
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
          <TableHead>Buyer</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="w-[200px]">Address</TableHead>
          <TableHead>Payment method</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(4)
          .fill(0)
          .map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium capitalize">joane</TableCell>
              <TableCell className="capitalize">08273512</TableCell>
              <TableCell>73/B Lebanon</TableCell>
              <TableCell>Cash on Delivery</TableCell>
              <TableCell>$90.99</TableCell>
              <TableCell className="capitalize flex opacity-50 items-center gap-5 justify-end">
                <OrderDetailModal />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
