"use client";

import { signOut } from "@/api-routes/users";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();

  const handleSubmit = async () => {
    await signOut();
    console.log("sign out success");

    router.refresh();
    router.push("/login");
  };

  return (
    <button className="text-left" type="submit" onClick={handleSubmit}>
      Sign out
    </button>
  );
};

export default SignOut;
