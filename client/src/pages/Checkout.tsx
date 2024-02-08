import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/components/auth-context";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { COUPON_CODE } from "@/constanst";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { displayPrice } from "@/utils/helper";
import Checkbox from "@/components/Checkbox";
import { createOrderApi } from "@/services/orderService";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Invalid phone number format" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" })
    .max(100, { message: "Address cannot exceed 100 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [totalPurchase, setTotalPurchase] = useState<number | null>(null);
  const [checkPayment, setCheckPayment] = useState<boolean>(false);
  const { cart, calculateSubTotal, calculatePurchase, clearCart } = useCart();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!checkPayment) {
      toast.info("Please check payment method");
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("EXCLUSIVE_TOKEN") || "");
      const total = calculatePurchase();

      const request = {
        shippingAddress: {
          ...values,
        },
        orderItems: cart,
        paymentMethod: "Cash on delivery",
        total,
        user: currentUser?._id,
      };

      await createOrderApi(token, request);
      toast.success("Place order successfully");
      clearCart();
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to place an order");
    }
  }

  const handleApplyCouponCode = () => {
    if (!couponCode) {
      toast.info("Please fill in coupon code");
      return;
    }

    if (couponCode !== COUPON_CODE) {
      toast.error("Wrong coupon code");
      return;
    }

    if (couponApplied) {
      toast.error("Coupon code has already been applied.");
      return;
    }

    const total = calculatePurchase(couponCode);
    setTotalPurchase(total);
    setCouponApplied(true);
  };

  return (
    <section className="mt-[80px] mb-[140px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 items-start gap-[100px]">
            {/* FORM */}
            <div>
              <h1 className="mb-5 font-semibold text-3xl">Billing Details</h1>
              <ul className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          className="h-[50px] border-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          className="h-[50px] border-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your address"
                          {...field}
                          className="h-[50px] border-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                          className="h-[50px] border-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ul>
            </div>

            <div>
              {/* PRODUCTS */}
              <ul className="flex flex-col gap-3">
                {cart?.map((item) => (
                  <li
                    key={item?.product}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-5">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="w-[54px] h-[54px] object-contain flex-shrink-0"
                      />
                      <h1 className="capitalize text-sm max-w-[300px] truncate">
                        {item?.name}
                      </h1>
                    </div>

                    <p>{displayPrice(item?.price)}</p>
                  </li>
                ))}
              </ul>

              {/* BILL */}
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
                  <p>
                    {totalPurchase !== null
                      ? displayPrice(totalPurchase)
                      : displayPrice(calculatePurchase())}
                  </p>
                </li>
              </ul>

              {/* CHECK PAYMENT */}
              <div
                className="flex mt-2 items-center gap-2 cursor-default select-none"
                onClick={() => setCheckPayment(!checkPayment)}
              >
                {checkPayment ? <Checkbox type="checked" /> : <Checkbox />}
                Cash on delivery
              </div>

              {/* Coupon Code */}
              <div className="flex items-center gap-4 mt-5">
                <Input
                  type="text"
                  value={couponCode}
                  className="h-[50px] border-gray-500"
                  placeholder="Coupon Code"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCouponCode(e.target.value)
                  }
                />
                <Button
                  type="button"
                  onClick={handleApplyCouponCode}
                  className="h-[50px] px-10"
                >
                  Apply Coupon
                </Button>
              </div>

              {/* Submit */}
              <Button type="submit" className="h-[50px] w-full mt-[32px]">
                Place Order
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default Checkout;
