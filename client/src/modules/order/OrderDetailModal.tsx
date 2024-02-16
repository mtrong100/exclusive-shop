import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TOrder } from "@/types/main-types";
import { displayPrice } from "@/utils/helper";
import { format } from "timeago.js";

export function OrderDetailModal({ order }: { order: TOrder }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Eye size={22} className="cursor-pointer hover:text-primary" />
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Order: #{order?._id}</DialogTitle>
        </DialogHeader>
        <main>
          <div className="text-lg">
            From:{" "}
            <span className="font-semibold text-primary">
              {order?.shippingAddress?.fullName}
            </span>
          </div>

          <div className="mt-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Product</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.orderItems?.map((item) => (
                  <TableRow key={item?.name}>
                    <TableCell className="font-medium capitalize">
                      <div className="flex items-center gap-4">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="w-[50px] h-[50px] object-contain flex-shrink-0"
                        />
                        <p className="line-clamp-2 text-sm">{item?.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {item?.quantity}
                    </TableCell>
                    <TableCell className="text-center text-green-600 font-medium">
                      {displayPrice(Number(item?.price))}
                    </TableCell>
                    <TableCell className="text-right">
                      {format(order?.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-end text-lg font-medium">
            Total: {displayPrice(order?.total)}
          </div>
        </main>
      </DialogContent>
    </Dialog>
  );
}
