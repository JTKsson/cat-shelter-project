import { createClient } from "@/utils/supabase/client";
import { uploadImage } from "@/utils/uploadImage";

const supabase = createClient();

export const getCats = async () => {
  const { data, error, status } = await supabase
    .from("cats")
    .select("*, image_url");

  return { data, error, status };
};

export const addCat = async ({ name, year, desc, image }) => {
  if (image) {
    const { publicUrl, error } = await uploadImage(image);

    if (!error) {
      image = publicUrl.publicUrl;
    }

    console.log("image from addCat: ", image);
  }
  try {
    const { data, error, status } = await supabase
      .from("cats")
      .insert({
        name: name,
        year: year,
        desc: desc,
        image_url: image,
      })
      .single();

    return { data, error, status };
  } catch (error) {
    return { error };
  }
};

export const updateCat = async ({ name, year, desc, image, id }) => {
  const isNewImage = typeof image === "object" && image !== null;

  console.log("id from api-route", id)

  if (isNewImage) {
    const { publicUrl, error } = await uploadImage(image);

    if (!error) {
      image = publicUrl.publicUrl;
    }
  }

  const { data, error, status } = await supabase
    .from("cats")
    .update({
      name: name,
      year: year,
      desc: desc,
      image_url: image,
    })
    .select()
    .single()
    .eq("id", id);

    console.log("id from lower api route", id)
  return { error, status, data };
};
