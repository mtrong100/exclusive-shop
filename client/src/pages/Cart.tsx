import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import blackConsole from "../assets/images/black-console.png";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth-context";
import { toast } from "sonner";

const Cart = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleMoveToCheckout = () => {
    if (!currentUser) {
      navigate("/login");
      toast.warning("You don't have an account. Please login first");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <section className="mt-[80px] mb-[140px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="w-[100px]">Quantity</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(2)
            .fill(0)
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-4 relative">
                    <div className="w-[54px] h-[54px] flex-shrink-0">
                      <img
                        src={blackConsole}
                        alt="blackConsole"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="absolute -top-1 w-[22px] h-[22px] cursor-pointer -left-1 flex items-center justify-center rounded-full bg-primary text-white text-xs">
                      <X size={14} />
                    </span>
                    <p className="flex-1">LCD Monitor</p>
                  </div>
                </TableCell>
                <TableCell>$650</TableCell>
                <TableCell>
                  <input
                    type="number"
                    value={1}
                    min={1}
                    className="text-black border p-2 w-[72px] rounded-md border-gray-500"
                  />
                </TableCell>
                <TableCell className="text-right">$650</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="mt-[80px] grid grid-cols-2 items-start gap-[173px]">
        {/* Coupon Code */}
        <div className="flex items-center gap-5">
          <Input
            type="text"
            className="h-[50px] border-gray-500"
            placeholder="Coupon Code"
          />
          <Button className="h-[50px] px-10">Apply Coupon</Button>
        </div>

        {/* Cart Total*/}
        <div className="border-gray-500 border p-5 rounded-md">
          <h1 className="font-medium text-lg">Cart Total</h1>
          <ul className="mt-[24px] flex flex-col gap-4">
            <li className="flex items-center justify-between border-b border-black pb-2">
              <p>Subtotal:</p>
              <p>$1750</p>
            </li>
            <li className="flex items-center justify-between border-b border-black pb-2">
              <p>Shipping:</p>
              <p>$5</p>
            </li>
            <li className="flex items-center justify-between ">
              <p>Total:</p>
              <p>$1750</p>
            </li>
          </ul>
          <Button
            onClick={handleMoveToCheckout}
            className="h-[50px] px-10 mt-[16px] mx-auto flex"
          >
            Procees to checkout
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
