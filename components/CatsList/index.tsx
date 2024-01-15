import { createClient } from '@/utils/supabase/client'

const CatsList = async () => {

  const supabase = createClient()

  const {data, error} = await supabase.from("cats").select()
}

export default CatsList