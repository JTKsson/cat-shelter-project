"use client"
import AddCat from "@/components/AddCat";
import CatsList from "@/components/CatsList";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
const VacantCats = () => {
  const [isUser, setIsUser] = useState(null);

  useEffect(() => {
    const supabase = createClientComponentClient();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsUser(user);
    };

    getUser();
  }, [])

  return(
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
    <h1>Vacant cats</h1>
    <CatsList />
    {isUser && (
      <AddCat />
    )}
  </div>  )
}

export default VacantCats