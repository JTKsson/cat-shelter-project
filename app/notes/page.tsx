import { useUser } from "@supabase/auth-helpers-react";

export default async function Page() {

  const user = "Hello"

  console.log(user)

  return (
    <>
      <p>Hello</p>
      {{user} ? (<div>User was found</div>) : (<div>User was not found</div>)}
    </>
  );
}
