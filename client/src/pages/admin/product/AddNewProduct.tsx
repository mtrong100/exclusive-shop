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
import { Plus } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BackButton from "@/components/BackButton";
import { toast } from "sonner";
import useUploadSingleImage from "@/hooks/useUploadSingleImage";
import { ChangeEvent } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
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

const AddNewProduct = () => {
  const { image, setImage, isUploading, handleUploadSingleImage } =
    useUploadSingleImage();

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
                {/* THUMBNAIL */}
                <ThumbnailUpload
                  onChange={handleUploadSingleImage}
                  image={image}
                  loading={isUploading}
                  setImage={setImage}
                />

                {/* CAROUSEL IMAGES */}
                <FormItem>
                  <FormLabel>Product images</FormLabel>
                  <Carousel className="w-full max-w-xs mx-auto">
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                          <div className="aspect-square border border-dashed border-gray-400 rounded-md flex items-center justify-center">
                            <label htmlFor="upload-images">
                              <Plus
                                size={80}
                                className="cursor-pointer opacity-50"
                              />
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              name="upload-images"
                              id="upload-images"
                              className="hidden"
                              multiple
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </FormItem>
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

interface ThumbnailUploadProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  image: string;
  loading: boolean;
  setImage: (image: string) => void;
}

function ThumbnailUpload({
  onChange,
  image,
  loading,
  setImage,
}: ThumbnailUploadProps) {
  return (
    <FormItem>
      <FormLabel>Product thumbnail</FormLabel>
      {!loading && image && (
        <img src={image} alt="" className="aspect-square" />
      )}

      {!image && (
        <div className="aspect-square border border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <label htmlFor="upload-thumbnail">
            <Plus size={80} className="cursor-pointer opacity-50" />
          </label>
          <input
            type="file"
            accept="image/*"
            name="upload-thumbnail"
            id="upload-thumbnail"
            className="hidden"
            onChange={onChange}
          />
        </div>
      )}
    </FormItem>
  );
}
