import { Cats } from "@/types/types";
import { uploadImage } from "@/utils/uploadImage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export const getCats = async () => {
  const { data, error, status } = await supabase
    .from("cats")
    .select("*, image_url");

  return { data, error, status };
};

export const addCat = async ({ name, year, desc, image }: Cats) => {
  let imageUrl: string | undefined;

  if (image) {
    const { publicUrl, error } = await uploadImage(image);

    if (!error) {
      imageUrl = publicUrl.publicUrl;
    }

    console.log("image from addCat: ", image);
    console.log(imageUrl);
  }
  try {
    const { error, status } = await supabase
      .from("cats")
      .insert({
        name: name,
        year: year,
        desc: desc,
        image_url: imageUrl,
      })
      .single();

    console.log({ error, status });
    return { error, status };
  } catch (error) {
    return { error };
  }
};

export const deleteCat = async ({ id }: Cats) => {
  const { error } = await supabase.from("cats").delete().eq("id", id);

  console.log("id from delete", id);
  return error;
};

export const updateCat = async ({ name, year, desc, image, id }: Cats) => {
  let imageUrl: string | undefined;

  if (!image) {
    console.log("no image ");
  }
  const isNewImage = typeof image === "object" && image !== null;

  console.log({ name, year, desc, image, id });

  if (isNewImage) {
    const { publicUrl, error } = await uploadImage(image);

    if (!error) {
      imageUrl = publicUrl.publicUrl;
    }
  }

  try {
    const { error, status } = await supabase
      .from("cats")
      .upsert({
        name: name,
        year: year,
        desc: desc,
        image_url: imageUrl,
      })
      .eq("id", id); // Specify the condition using eq method
    console.log({ error, status });
    return { error, status };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
