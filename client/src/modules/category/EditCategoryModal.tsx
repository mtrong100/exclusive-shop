import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { getCategories, updateCategoryApi } from "@/services/categoryService";
import { storeCategories } from "@/redux/slices/categorySlice";
import { toast } from "sonner";
import { TCategory } from "@/types/main-types";

const formSchema = z.object({
  name: z.string().toLowerCase().trim().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});

export function EditCategoryModal({ item }: { item: TCategory }) {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.reset({
      name: item?.name,
    });
  }, [form, item?.name]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const token = JSON.parse(localStorage.getItem("EXCLUSIVE_TOKEN") || "");
      await updateCategoryApi(item?._id, token, values.name);
      const data = await getCategories();
      dispatch(storeCategories(data?.docs));
      toast.success("Category updated");
      form.reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update category");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil size={22} className="cursor-pointer hover:text-primary" />
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="flex ml-auto">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
