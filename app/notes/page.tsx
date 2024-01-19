"use client";
import { useUser } from "@supabase/auth-helpers-react";

export default function Page() {
  const user = useUser();

  return (
    <>
      <p>Hello</p>
      {user ? (<div>You are logged in</div>) : (<div>You are not logged in</div>)}
    </>
  );
}
