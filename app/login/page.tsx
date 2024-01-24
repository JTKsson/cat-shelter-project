"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { signIn } from "@/api-routes/users";

const Login = () => {
  const [isUser, setIsUser] = useState<User | null>(null);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClientComponentClient();
  const router = useRouter();

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

    if (isUser) {
      router.push("/admin");
    }
  }, [isUser, router]);

  const handleSignIn = async () => {
    await signIn({
      email: email,
      password: password,
    })
    router.refresh()
    router.push("/")
  }

  return (
    <>
      <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleSignIn}>Sign in</button>
    </>
  )
};

export default Login;
