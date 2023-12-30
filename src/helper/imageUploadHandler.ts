import { supabase } from "./supabase";

type ImageType = {
  fileName: string;
} & Partial<File>;
const useFileUpload = () => {
  const imageUpload = async (file: ImageType) => {
    const currentTimeStamp = new Date().getTime();
    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET)
      .upload(`public/${currentTimeStamp}`, file as File, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }
    return data;
  };
  return {
    imageUpload,
  };
};

export default useFileUpload;
