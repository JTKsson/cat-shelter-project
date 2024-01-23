import AddCat from "@/components/AddCat";
import CatsList from "@/components/CatsList";
import SignOut from "@/components/SignOut";

export default async function Index() {

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <SignOut />
      <h1>Hejsan hoppsan</h1>
      <CatsList />
      <AddCat />
    </div>
  );
}
