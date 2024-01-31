import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/utils/firebase";

initializeApp(firebaseConfig);

interface Props {
  listImages: string[];
  setListImages: Dispatch<SetStateAction<string[]>>;
}

const ProductCarouselImages = ({ listImages = [], setListImages }: Props) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);

    if (fileArray.length > 5) {
      toast.error("You can only upload 5 images");
      return;
    }

    fileArray.forEach((file) => handleUploadImages(file));
  };

  const handleUploadImages = (file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, "pictures/" + file.name + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {
        setIsUploading(true);
      },
      (error) => {
        console.log(error);
        setListImages([]);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setListImages((prevListImages) => [...prevListImages, downloadURL]);
          setIsUploading(false);
        });
      }
    );
  };

  const handleDeleteImage = (url: string) => {
    const newImages = listImages.filter((item) => item !== url);
    setListImages(newImages);
  };

  return (
    <FormItem>
      <FormLabel>Product images</FormLabel>
      {listImages.length === 0 && (
        <div className="aspect-square border border-dashed border-gray-400 rounded-md flex items-center justify-center">
          {isUploading ? (
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
          ) : (
            <label htmlFor="upload-images">
              <Plus size={80} className="cursor-pointer opacity-50" />
            </label>
          )}
          <input
            type="file"
            accept="image/*"
            name="upload-images"
            id="upload-images"
            className="hidden"
            multiple
            onChange={handleSelectImages}
          />
        </div>
      )}

      {!isUploading && listImages.length > 0 && (
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {listImages.map((item, index) => (
              <CarouselItem key={index} className="relative border">
                <img
                  src={item}
                  alt=""
                  className="aspect-square rounded-md object-contain"
                />
                <span
                  onClick={() => handleDeleteImage(item)}
                  className="flex items-center justify-center w-[35px] h-[35px] bg-primary rounded-full absolute top-3 right-3 text-white cursor-pointer"
                >
                  <X />
                </span>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </FormItem>
  );
};

export default ProductCarouselImages;
