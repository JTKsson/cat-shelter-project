import { deleteCat } from "@/api-routes/cats";
import { Cats } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteCat = (id: Cats) => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      
      await deleteCat( id );

      router.refresh();
      console.log("Post removed");
    } else {
      console.log("Post was not removed");
    }
  };

  return (
    <button className="bg-red-600 rounded-xl px-3 py-2 w-fit self-center" type="submit" onClick={handleSubmit}>
      Delete
    </button>
  );
};

export default DeleteCat;
