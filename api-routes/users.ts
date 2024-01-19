import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const createUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  return (data, error)
};

export const signIn = async ({ email, password }) => {

  console.log("from user.ts ", email, password)
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,

  });

 // return(data, error)
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  return (error)
};
