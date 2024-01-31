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
import { useEffect, useState } from "react";
import ProductThumbnail from "@/modules/product/ProductThumbnail";
import ProductCarouselImages from "@/modules/product/ProductCarouselImages";
import CategoryCombobox from "../category/CategoryCombobox";
import ComboboxRoot from "@/components/ComboboxRoot";
import { getAllProductsApi, updateProductApi } from "@/services/productService";
import { TProductRequest } from "@/types/general-types";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useGetProductDetail from "@/modules/product/useGetProductDetail";
import { useAppDispatch } from "@/redux/store";
import { storeProducts } from "@/redux/slices/productSlice";

const formSchema = z.object({
  name: z
    .string()
    .toLowerCase()
    .min(10, { message: "Name must be at least 10 characters long" })
    .max(300, { message: "Name cannot exceed 300 characters" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  discount: z.number().int().min(0).optional(),
  description: z
    .string()
    .min(100, { message: "Description must be at least 100 characters long" })
    .max(2000, { message: "Description cannot exceed 2000 characters" }),
  stock: z
    .number()
    .int()
    .min(0, { message: "Stock must be a non-negative integer" })
    .positive({ message: "Stock must be a positive number" }),
});

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: productDetail } = useGetProductDetail(id as string);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [listImages, setListImages] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [rating, setRating] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discount: 5,
      stock: 10,
    },
  });

  useEffect(() => {
    form.reset({
      name: productDetail?.name,
      description: productDetail?.description,
      price: productDetail?.price,
      discount: productDetail?.discount,
      stock: productDetail?.stock,
    });

    setListImages(productDetail?.images as string[]);
    setRating(productDetail?.rating as string);
    setCategory(productDetail?.category as string);
    setThumbnail(productDetail?.thumbnail as string);
  }, [
    form,
    productDetail?.category,
    productDetail?.description,
    productDetail?.discount,
    productDetail?.images,
    productDetail?.name,
    productDetail?.price,
    productDetail?.rating,
    productDetail?.stock,
    productDetail?.thumbnail,
  ]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsUpdating(true);

      if (!thumbnail) {
        toast.info("Please upload your product thumbnail");
        return;
      }

      if (!category) {
        toast.info("Please choose your product category");
        return;
      }

      if (!rating) {
        toast.info("Please rate your product");
        return;
      }

      const request: TProductRequest = {
        ...values,
        thumbnail,
        category,
        rating,
        images: listImages,
      };

      const token = JSON.parse(localStorage.getItem("EXCLUSIVE_TOKEN") || "");
      await updateProductApi(id as string, token, request);
      const data = await getAllProductsApi();
      dispatch(storeProducts(data?.docs));
      toast.success("Product updated");
      setIsUpdating(false);

      navigate("/manage-product");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product");
      setIsUpdating(false);
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
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(value);
                          }}
                        />
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
                        <Input
                          {...field}
                          min={0}
                          type="number"
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <ComboboxRoot
                    data={["1", "2", "3", "4", "5"]}
                    placeHolder="Choose rating..."
                    value={rating}
                    setValue={setRating}
                    className="w-[600px]"
                  />
                </FormItem>

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          min={0}
                          type="number"
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            field.onChange(value);
                          }}
                        />
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
              disabled={isUpdating}
              type="submit"
              className="h-[50px] px-20 text-lg flex mx-auto"
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default EditProduct;
