import { ChangeEvent, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
/* <<=============================================================>> */

export default function useUploadListImage() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [listImage, setListImage] = useState<string[]>([]);

  // SELECT IMAGES
  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    fileArray.forEach((file) => handleUploadListImage(file));
  };

  const handleUploadListImage = (file: File) => {
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
        setListImage([]);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setListImage([...listImage, downloadURL]);
          setIsUploading(false);
        });
      }
    );
  };

  return {
    listImage,
    setListImage,
    isUploading,
    handleSelectImages,
  };
}
