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
    <div className="flex flex-col bg-slate-600 p-4 rounded-xl self-center mt-4">
      <p className="mb-2">Sign in</p>
      <input className="mb-2" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email"/>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
      />
      <button className="bg-blue-800  rounded-xl px-3 py-2 w-fit self-center mt-4"  onClick={handleSignIn}>Sign in</button>
    </div>
  )
};

export default Login;
