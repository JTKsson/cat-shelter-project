"use client"

import { signOut } from "@/api-routes/users"

const SignOut = () => {

  const handleSubmit = async () => {

    try {
      await signOut()
      console.log("sign out success")
      
    } catch (error) {
      console.log("sign out failed: ", error)
    }
  }

  return(
    <button type="submit" onClick={handleSubmit}>Sign out</button>
  )
}

export default SignOut