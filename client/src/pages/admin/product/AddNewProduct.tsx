import TitleSection from "@/components/TitleSection";
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
import { Textarea } from "@/components/ui/textarea";
import BackButton from "@/components/BackButton";
import { toast } from "sonner";
import { useState } from "react";
import ProductThumbnail from "@/modules/product/ProductThumbnail";
import ProductCarouselImages from "@/modules/product/ProductCarouselImages";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/utils/firebase";
import CategoryCombobox from "../category/CategoryCombobox";

const formSchema = z.object({
  name: z
    .string()
    .toLowerCase()
    .min(10, { message: "Name must be at least 10 characters long" })
    .max(300, { message: "Name cannot exceed 300 characters" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  discount: z.number().positive().optional(),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot exceed 5" }),
  description: z
    .string()
    .min(100, { message: "Description must be at least 100 characters long" })
    .max(2000, { message: "Description cannot exceed 2000 characters" }),
  stock: z
    .number()
    .int()
    .min(0, { message: "Stock must be a non-negative integer" }),
});

initializeApp(firebaseConfig);

const AddNewProduct = () => {
  const [thumbnail, setThumbnail] = useState<string>("");
  const [listImages, setListImages] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discount: 5,
      rating: 1,
      stock: 10,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      //....
      console.log(values);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add new product");
    }
  }

  return (
    <section className="relative">
      <BackButton path="/manage-product" />
      <TitleSection>Create a new product</TitleSection>
      <div className="mt-5 w-full max-w-[950px] mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <section className="grid grid-cols-[600px_minmax(0,_1fr)] gap-[80px] mb-6 items-center">
              {/* FORM INPUT */}
              <ul className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <CategoryCombobox
                    category={category}
                    setCategory={setCategory}
                  />
                </FormItem>

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ul>

              {/* IMAGES */}
              <div className="grid grid-cols-1 gap-[30px]">
                <ProductThumbnail
                  thumbnail={thumbnail}
                  setThumbnail={setThumbnail}
                />
                <ProductCarouselImages
                  listImages={listImages}
                  setListImages={setListImages}
                />
              </div>
            </section>

            <Button
              type="submit"
              className="h-[50px] px-20 text-lg flex mx-auto"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default AddNewProduct;
