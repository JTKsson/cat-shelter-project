import AddCat from "@/components/AddCat";
import CatsList from "@/components/CatsList";
const VacantCats = () => {

  return(
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
    <h1>Vacant cats</h1>
    <CatsList />
    <AddCat />
  </div>  )
}

export default VacantCats