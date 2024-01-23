"use client"

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const Login = () => {
  const client = createClientComponentClient()
  const router = useRouter()

 const getUser = async () => {
   const {
    data: { user },
  } = await client.auth.getUser();
 }


  useEffect(() => {
    if (user) {
      router.push("/admin")
    }
  }, [user, router])

    return (
      <Auth
        redirectTo="/"
        appearance={{ theme: ThemeSupa }}
        supabaseClient={client}
        providers={[]}
        socialLayout="horizontal"
      />
    )

}

export default Login