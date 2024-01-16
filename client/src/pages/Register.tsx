import authBanner from "../assets/images/auth-banner.png";
import { FcGoogle } from "react-icons/fc";
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
import { googleLoginApi, registerApi } from "@/services/authService";
import { defaultAvatar } from "@/constanst";
import { toast } from "sonner";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAuth } from "@/components/auth-context";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const Register = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const requestData = {
        ...values,
        avatar: defaultAvatar,
        isAdmin: false,
      };

      const data = await registerApi(requestData);
      toast.success(data?.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create an account. Try again");
    }
  }

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const results = await signInWithPopup(auth, provider);
      const user = results.user;

      const requestData = {
        name: user?.displayName as string,
        email: user?.email as string,
        avatar: user?.photoURL as string,
        isAdmin: false,
      };

      const data = await googleLoginApi(requestData);
      localStorage.setItem("EXCLUSIVE_USER", JSON.stringify(data?.results));
      localStorage.setItem("EXCLUSIVE_TOKEN", JSON.stringify(data?.token));
      setCurrentUser({ ...data?.results, token: data?.token });
      toast.success(data?.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create an account. Try again");
    }
  };

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
            <h1 className="text-3xl font-medium">Create an account</h1>
            <p className="mt-2">Enter your details below</p>

            <div className="flex flex-col gap-3 mt-8">
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

            <Button type="submit" className="h-[50px] px-10 w-full mt-5">
              Create Account
            </Button>

            {/* GOOGLE-LOGIN */}
            <div
              onClick={googleLogin}
              className="flex items-center justify-center gap-3 hover:bg-primary/5 hover:text-primary hover:border-primary cursor-pointer transition-all  mt-4 w-full border h-[50px]"
            >
              <FcGoogle size={20} />
              <p>Sign up with Google</p>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <p>Already have account?</p>
              <Link
                to="/login"
                className="font-medium hover:text-primary border-b border-black"
              >
                Log in
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Register;
