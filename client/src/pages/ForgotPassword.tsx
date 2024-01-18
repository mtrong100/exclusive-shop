import authBanner from "../assets/images/auth-banner.png";
import { useNavigate } from "react-router-dom";
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
import { toast } from "sonner";
import { resetPasswordApi, sendOtpApi } from "@/services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const formSchema: any = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    otp: z
      .string()
      .min(6, { message: "OTP code only has 6 numbers" })
      .max(6, { message: "OTP code only has 6 numbers" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .refine((data) => data === form.getValues().password, {
        message: "Passwords do not match",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      email: "",
      otp: "",
    },
  });

  const handleSendOtp = async () => {
    try {
      await form.trigger("email");
      const email = form.getValues("email");

      const data = await sendOtpApi(email);
      toast.success(data?.message);
    } catch (error) {
      toast.error("Failed to send OTP code");
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const requestData = {
        ...values,
      };

      const data = await resetPasswordApi(requestData);
      toast.success(data?.message);
      form.reset();
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Faild to create an account. Try again");
    }
  }

  return (
    <section className="mt-[60px] mb-[140px]">
      <div className="grid grid-cols-2 gap-10 items-center">
        <div className="rounded-md">
          <img src={authBanner} alt="authBanner" className="img-cover" />
        </div>

        {/* FORM CONTENT */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto"
          >
            <h1 className="text-3xl font-medium">Forgot password</h1>

            <div className="flex flex-col gap-3 mt-8">
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password..."
                        {...field}
                        className="h-[50px] border-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password..."
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
                    <FormLabel>Email</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email..."
                          {...field}
                          className="h-[50px] border-gray-500"
                        />
                      </FormControl>

                      <Button
                        onClick={handleSendOtp}
                        type="button"
                        className="h-[50px] px-10"
                      >
                        Send OTP
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your OTP code..."
                        {...field}
                        className="h-[50px] border-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="h-[50px] px-10 mt-5 ml-auto flex">
              Reset password
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ForgotPassword;
