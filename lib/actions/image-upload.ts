import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize Supabase client
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export const handleImageUpload = async (file: any) => {
  try {
    const { data, error } = await supabase.storage
      .from("test")
      .upload(`images/${file.name}`, file, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      throw error;
    }

    if (data) {
      const storageBaseUrl = supabase.storage
        .from("test")
        .getPublicUrl(`images/${file.name}`); // Get the base URL
      return storageBaseUrl.data.publicUrl;
    } else {
      throw new Error("Failed to upload image");
    }
  } catch (error) {
    throw error;
  }
};

export function startImageUpload(
  file: File,
  onSuccess: (src: string) => void,
  onError: (error: any) => void
) {
  // check if the file is an image
  if (!file.type.includes("image/")) {
    //TODO add toast back
    // toast.error("File type not supported.");
    return;
  } else if (file.size / 1024 / 1024 > 20) {
    // toast.error("File size too big (max 20MB).");
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    try {
      const src = await handleImageUpload(file);
      onSuccess(src);
    } catch (error) {
      onError(error);
    }
  };
}
