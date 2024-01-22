//import { createClient } from "@/utils/supabase/client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
//import { useSession } from "@supabase/auth-helpers-react";
import { User } from "@/types/types";

const supabase = createClientComponentClient()

export const createUser = async ({ email, password }: User) => {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  return (error)
};

export const signIn = async ({ email, password }: User) => {

  console.log("from user.ts ", email, password)
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,

  });

   console.log(data, error)
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  return (error)
};
