"use client"

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
//import { createServerClient } from '@supabase/ssr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const Login = () => {
 // const supabaseClient = useSupabaseClient()
  const client = createClientComponentClient()
  const user = useUser()
  const router = useRouter()
  const session = useSession()

  console.log(session)

  useEffect(() => {
    if (user) {
      router.push("/")
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