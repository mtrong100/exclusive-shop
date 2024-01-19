import TitleSection from "@/components/TitleSection";
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
import { getUserDetailApi, updateUserApi } from "@/services/userService";
import { useAuth } from "@/components/auth-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be longer than 2 characters" })
    .max(50, { message: "Name can not exceed 50 characters" }),
  phone: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Phone number must be 10 digits",
  }),
  address: z
    .string()
    .min(5, { message: "Address must be longer than 2 characters" })
    .max(100, { message: "Name can not exceed 100 characters" }),
});

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  // FULL-FILL DATA
  useEffect(() => {
    async function fetchData() {
      const token = JSON.parse(localStorage.getItem("EXCLUSIVE_TOKEN") || "");
      const data = await getUserDetailApi(currentUser?._id as string, token);
      form.reset({
        name: data?.name,
        phone: data?.phone,
        address: data?.address,
      });
    }
    fetchData();
  }, [currentUser?._id, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const request = {
        ...values,
      };

      const token = JSON.parse(localStorage.getItem("EXCLUSIVE_TOKEN") || "");
      const data = await updateUserApi(
        currentUser?._id as string,
        token,
        request
      );
      setCurrentUser(data?.results);
      toast.success(data?.message);
    } catch (error) {
      toast.error("Failed to update profile. Try again");
    }
  }

  return (
    <div className="mt-[80px] mb-[140px]">
      <TitleSection>
        Welcome back! <span className="text-primary">Md Rimel</span>
      </TitleSection>
      <div className="mt-10">
        <h1 className="text-primary text-2xl font-medium mb-5">
          Edit Your Profile
        </h1>

        {/* FORM CONTENT */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-8">
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
            </div>
            <div className="mt-5 flex items-center justify-end gap-5">
              <Button
                onClick={() => navigate("/forgot-password")}
                type="button"
                variant="outline"
                className="h-[50px] px-5 border-gray-500"
              >
                Update password
              </Button>
              <Button type="submit" className="h-[50px] px-10">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
