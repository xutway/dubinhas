import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytes,
} from "firebase/storage";

import { storage } from "../config/firebaseConfig";

const useFileUpload = () => {
  const fetchToFile = async (url: string) => {
    try {
      const response = await fetch(url);

      const blob = await response.blob();

      const data = new File([blob], "image.jpg", { type: "image/jpeg" });

      return data;
    } catch (err) {
      console.log("ERROR FETCHING FILE TO BLOB", err);
    }
  };

  const getStorage = async (path: string) => {
    const gsReference = getDownloadURL(ref(storage, path));

    return gsReference;
  };
  const imageUpload = async (
    storage: any,
    file: File,
    path: string,
    name?: string,
  ) => {
    const newFile = file as any;
    fetchToFile(newFile[0]?.uri ?? file);
    const filetoBlob = await fetch(newFile[0]?.uri ?? file).then((res) =>
      res.blob(),
    );

    const filename = newFile[0]?.uri?.split("ImagePicker/")[1] ?? name;

    const newMetadata = {
      contentType: `${file[0]?.type}/${filename?.split(".")[1]}`,
    };

    const storageRef = ref(storage, `${path}/` + filename);
    let fileref: StorageReference;
    await uploadBytes(storageRef, filetoBlob, newMetadata)
      .then((snapshot) => {
        fileref = snapshot.ref;
      })
      .catch((err) => console.log("ERROR UPLOADING IMAGE", err));
    return fileref;
  };
  return {
    imageUpload,
    getStorage,
  };
};

export default useFileUpload;
