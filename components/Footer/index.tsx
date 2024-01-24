"use client"

import Link from "next/link";
import SignOut from "../SignOut";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Footer = () => {
  const [isUser, setIsUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();


  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        setIsUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
  }, []);

  return (
    <div className="flex flex-col p-4 justify-center">
      <div className="flex flex-row p-2 justify-evenly">
        <section className="flex flex-col">
          <p>Sponsors:</p>
          <p>Animals Friends</p>
          <p>Hardware Store</p>
        </section>
        <section className="flex flex-col">
          <Link href="/admin">Admin</Link>
          {isUser ? <SignOut /> : <Link href="/login">Sign in</Link>}
          <p>Social media link</p>
          <p>Social media link</p>
        </section>
      </div>
      <p className="text-center">Name of catshelter | Page build by <Link href="https://github.com/JTKsson" target="_blank">Timothy Karlsson</Link></p>
    </div>
  );
};

export default Footer