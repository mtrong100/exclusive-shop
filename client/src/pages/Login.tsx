import authBanner from "../assets/images/auth-banner.png";
import { Link, useNavigate } from "react-router-dom";
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
import { loginApi } from "@/services/authService";
import { toast } from "sonner";
import { useAuth } from "@/components/auth-context";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const Login = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const requestData = {
        ...values,
      };

      const data = await loginApi(requestData);
      localStorage.setItem("EXCLUSIVE_USER", JSON.stringify(data?.results));
      localStorage.setItem("EXCLUSIVE_TOKEN", JSON.stringify(data?.token));
      setCurrentUser(data?.results);
      toast.success(data?.message);
      navigate("/");
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
            <h1 className="text-3xl font-medium">Log in to Exclusive</h1>
            <p className="mt-2">Enter your details below</p>

            <div className="flex flex-col gap-3 mt-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email..."
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password..."
                        {...field}
                        className="h-[50px] border-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between mt-5">
              <Button type="submit" className="h-[50px] px-10">
                Log In
              </Button>

              <Link
                className="text-primary font-normal hover:underline"
                to="/forgot-password"
              >
                Forget Password?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Login;
