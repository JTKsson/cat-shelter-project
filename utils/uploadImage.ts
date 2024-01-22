import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export const uploadImage = async (file: File) => {
    console.log(file)

    const fullFileName = file.name.split(".")
    const fileName = fullFileName[0]
    const fileExt = fullFileName[1]

    const filePath = `${fileName}-${Math.random()}.${fileExt}`

    const { data, error } = await supabase
        .storage
        .from('catImages')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) {
        return { error };
    }

    const { data: publicUrl} = supabase
        .storage
        .from('catImages')
        .getPublicUrl(data.path)
    return {
        publicUrl
      }

}