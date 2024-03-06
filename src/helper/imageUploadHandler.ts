import { ref, uploadBytes } from "firebase/storage";

const useFileUpload = () => {
  const imageUpload = async (storage: any, file: File, path: string) => {
    const newFile = file as any;
    const filetoBlob = await fetch(newFile[0]?.uri).then((res) => res.blob());
    const filename = newFile[0]?.uri.split("ImagePicker/")[1];
    const newMetadata = {
      contentType: `${file[0]?.type}/${filename.split(".")[1]}`,
    };

    const storageRef = ref(storage, `${path}/` + filename);
    const { ref: fileref } = await uploadBytes(
      storageRef,
      filetoBlob,
      newMetadata,
    );

    return fileref;
  };
  return {
    imageUpload,
  };
};

export default useFileUpload;
