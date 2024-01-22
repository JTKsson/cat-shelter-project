"use client"
import AddCat from "@/components/AddCat";
import CatsList from "@/components/CatsList";
import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@supabase/auth-helpers-react";

export default function Index() {

  const session = useSession()
 // const client = createClientComponentClient()
 // const session = client.auth.getSession()

  console.log("from page.tsx", session)

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <SignIn />
      <SignOut />
      <h1>Hejsan hoppsan</h1>
      <CatsList/>
      <AddCat/>
    </div>
  );
}
