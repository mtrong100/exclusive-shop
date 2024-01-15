import { ChangeEvent, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
/* <<=============================================================>> */

export default function useUploadImage() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const handleUploadSingleImage = (event: ChangeEvent<HTMLInputElement>) => {
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
        setImage("");
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          setIsUploading(false);
        });
      }
    );
  };

  return {
    image,
    setImage,
    isUploading,
    handleUploadSingleImage,
  };
}
