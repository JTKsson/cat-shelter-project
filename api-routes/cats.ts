import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getCats = async () => {
  const { data, error, status } = await supabase.from("cats").select();

  return { data, error, status };
};
