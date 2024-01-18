"use client"
import AddCat from "@/components/AddCat";
import CatsList from "@/components/CatsList";

export default async function Index() {

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <h1>Hejsan hoppsan</h1>
      <CatsList/>
      <AddCat/>
    </div>
  );
}
