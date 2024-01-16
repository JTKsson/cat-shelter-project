import { createClient } from "@/utils/supabase/client";
import { uploadImage } from "@/utils/uploadImage";

const supabase = createClient();

export const getCats = async () => {
  const { data, error, status } = await supabase.from('cats').select('*, image_url');

  return { data, error, status };
};

export const addCat = async ({ name, year, desc, image }) => {


  if (image) {
    const { publicUrl, error } = await uploadImage(image);

    if (!error) {
      image = publicUrl.publicUrl;
    }

    console.log("image from addCat: ", image)
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

// const avatarFile = event.target.files[0]
// const { data, error } = await supabase
//   .storage
//   .from('avatars')
//   .upload('public/avatar1.png', avatarFile, {
//     cacheControl: '3600',
//     upsert: false
//   })
