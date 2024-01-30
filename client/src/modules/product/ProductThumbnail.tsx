import { FormItem, FormLabel } from "@/components/ui/form";
import { ChangeEvent, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/utils/firebase";

initializeApp(firebaseConfig);

interface Props {
  thumbnail: string;
  setThumbnail: React.Dispatch<React.SetStateAction<string>>;
}

const ProductThumbnail = ({ thumbnail, setThumbnail }: Props) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleUploadThumbnail = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File;
    if (!file) return;

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
        setThumbnail("");
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setThumbnail(downloadURL);
          setIsUploading(false);
        });
      }
    );
  };

  return (
    <FormItem>
      <FormLabel>Product thumbnail</FormLabel>
      {!isUploading && thumbnail && (
        <div className="relative">
          <img
            src={thumbnail}
            alt="product-thumbnail"
            className="aspect-square rounded-lg object-cover"
          />

          <span
            onClick={() => setThumbnail("")}
            className="flex items-center justify-center w-[35px] h-[35px] bg-primary rounded-full absolute top-3 right-3 text-white cursor-pointer"
          >
            <X />
          </span>
        </div>
      )}

      {!thumbnail && (
        <div className="aspect-square border border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center">
          {isUploading ? (
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
          ) : (
            <label htmlFor="upload-thumbnail">
              <Plus size={80} className="cursor-pointer opacity-50" />
            </label>
          )}
          <input
            type="file"
            accept="image/*"
            id="upload-thumbnail"
            className="hidden"
            onChange={handleUploadThumbnail}
          />
        </div>
      )}
    </FormItem>
  );
};

export default ProductThumbnail;
