import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";
import { supabase } from "../supabaseService";

/*
export const uploadImageToSupabase = async (
  fileUri: string,
  bucket: string = "post-images"
) => {
  try {
    // convert image to base64
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: "base64",
    });

    const fileExt = fileUri.split(".").pop() || "jpg";
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const contentType =
      fileExt === "png"
        ? "image/png"
        : fileExt === "webp"
        ? "image/webp"
        : "image/jpeg";

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, decode(base64), {
        contentType,
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.log("SUPABASE UPLOAD ERROR:", error);
    throw error;
  }
};

*/ 

export const uploadImageToSupabase = async (
  fileUri: string,
  bucket: string = "post-images",
  folder: string = "posts"
) => {
  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: "base64",
  });

  const fileExt = fileUri.split(".").pop() || "jpg";
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const contentType =
    fileExt === "png"
      ? "image/png"
      : fileExt === "webp"
      ? "image/webp"
      : "image/jpeg";

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, decode(base64), {
      contentType,
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return data.publicUrl;
};