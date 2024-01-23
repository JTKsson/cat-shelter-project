import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@/types/types";

const supabase = createClientComponentClient();

export const createUser = async ({ email, password }: User) => {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  return error;
};

export const signIn = async ({ email, password }: User) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  return error;
};

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
