import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderDetailModal } from "./OrderDetailModal";
import { displayPrice } from "@/utils/helper";
import { TOrder } from "@/types/main-types";

const OrderTable = ({ orders = [] }: { orders: TOrder[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Buyer</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="w-[350px]">Address</TableHead>
          <TableHead>Payment method</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((item) => (
          <TableRow key={item?._id}>
            <TableCell>{item?._id}</TableCell>
            <TableCell className="capitalize">
              {item?.shippingAddress?.fullName}
            </TableCell>
            <TableCell className="capitalize">
              {item?.shippingAddress?.phone}
            </TableCell>
            <TableCell>{item?.shippingAddress?.address}</TableCell>
            <TableCell>{item?.paymentMethod}</TableCell>
            <TableCell className="font-medium text-green-600">
              {displayPrice(item?.total)}
            </TableCell>
            <TableCell className="capitalize flex opacity-50 items-center gap-5 justify-end">
              <OrderDetailModal order={item} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
