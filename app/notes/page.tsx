import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";

export default async function Page() {

  const supabase = createClientComponentClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  //let metadata = user.user_metadata

  console.log({user})
  return (
    <>
      <p>Hello</p>
      {{user} ? (<div>User was found</div>) : (<div>User was not found</div>)}
    </>
  );
}
