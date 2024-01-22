"use client";
import { useUser } from "@supabase/auth-helpers-react";

export default function Page() {
  const user = useUser();

  return (
    <>
      <p>Hello</p>
      {user ? (<div>User was found</div>) : (<div>User was not found</div>)}
    </>
  );
}
