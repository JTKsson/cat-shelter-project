import { deleteCat } from "@/api-routes/cats"
import { useRouter } from "next/navigation"


const DeleteCat = ({id}) => {
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const confirm = window.confirm("Are you sure?")

    if (confirm){
      await deleteCat({id})

      router.refresh()
      console.log("Post removed")
    } else {
      console.log("Post was not removed")
    }
  }

  return (
    <button type="submit" onClick={handleSubmit}>Delete</button>
  )
}

export default DeleteCat