import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth-context";
import { toast } from "sonner";
import { useCart } from "@/components/cart-context";
import { displayPrice } from "@/utils/helper";

const Cart = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    calculateSubTotal,
    calculatePurchase,
  } = useCart();

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
      {cart.length !== 0 ? (
        <>
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
              {cart?.map((item) => (
                <TableRow key={item?.product}>
                  <TableCell className="font-medium w-[600px]">
                    <div className="flex items-center gap-4 relative">
                      <div className="w-[80px] h-[80px] flex-shrink-0">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="absolute -top-1 w-[22px] h-[22px] cursor-pointer -left-1 flex items-center justify-center rounded-full bg-primary text-white text-xs">
                        <X size={14} />
                      </span>
                      <p className="flex-1 capitalize">{item?.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{displayPrice(item?.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <button
                        className="w-[35px] h-[35px]  flex items-center hover:bg-muted justify-center rounded-md border "
                        onClick={() => decreaseQuantity(item?.product)}
                      >
                        <Minus size={16} />
                      </button>
                      <div>{item?.quantity}</div>
                      <button
                        className="w-[35px] h-[35px] bg-primary hover:opacity-80 text-white flex items-center justify-center rounded-md border "
                        onClick={() => increaseQuantity(item?.product)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {item?.subtotal
                      ? displayPrice(item?.subtotal)
                      : displayPrice(item?.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Cart Total */}
          <div className="mt-[80px] max-w-lg mx-auto">
            <div className="border-gray-500 border p-5 rounded-md">
              <h1 className="font-medium text-lg">Cart Total</h1>
              <ul className="mt-[24px] flex flex-col gap-4">
                <li className="flex items-center justify-between border-b border-black pb-2">
                  <p>Subtotal:</p>
                  <p>{displayPrice(calculateSubTotal())}</p>
                </li>
                <li className="flex items-center justify-between border-b border-black pb-2">
                  <p>Shipping:</p>
                  <p>$10</p>
                </li>
                <li className="flex items-center justify-between ">
                  <p>Total:</p>
                  <p>{displayPrice(calculatePurchase())}</p>
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
        </>
      ) : (
        <div className="mx-auto flex flex-col items-center justify-center gap-2">
          <img src="/empty-cart.png" alt="empty-cart" className="w-50 h-50" />
          <div className="text-center">
            <h1 className="font-semibold text-3xl opacity-80 mb-2">
              Your cart is empty
            </h1>
            <p className="max-w-sm mb-3">
              Looks like you have not added any products to your cart. Go ahead
              and explore our shop
            </p>
            <Button onClick={() => navigate("/shop")}>
              Explore now <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
