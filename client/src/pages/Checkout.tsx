import redConsole from "../assets/images/red-console.png";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Invalid phone number format" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" })
    .max(100, { message: "Address cannot exceed 100 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
});

const Checkout = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className="mt-[80px] mb-[140px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 items-start gap-[173px]">
            <div>
              <h1 className="mb-5 font-semibold text-3xl">Billing Details</h1>
              <ul className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
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
                  name="phoneNumber"
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
                {Array(2)
                  .fill(0)
                  .map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-5">
                        <img
                          src={redConsole}
                          alt="redConsole"
                          className="w-[54px] h-[54px] object-contain flex-shrink-0"
                        />
                        <h1>LCD Monitor</h1>
                      </div>

                      <p>$650</p>
                    </li>
                  ))}
              </ul>

              {/* BILL */}
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

              {/* CHECK PAYMENT */}
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="paymentMethod"
                  className="border-2 rounded-md w-[20px] h-[20px]"
                />
                <label
                  htmlFor="paymentMethod"
                  className=" leading-none text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Cash on delivery
                </label>
              </div>

              {/* Coupon Code */}
              <div className="flex items-center gap-4 mt-5">
                <Input
                  type="text"
                  className="h-[50px] border-gray-500"
                  placeholder="Coupon Code"
                />
                <Button className="h-[50px] px-10">Apply Coupon</Button>
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
