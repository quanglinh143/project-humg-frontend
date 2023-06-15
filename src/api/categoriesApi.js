import { useEffect, useState } from "react"
import { getDataCategories } from "services/api-client/categoriesApi"

const CategoriesApi = () => {
 const [categories, setCategories] = useState([])

 useEffect(() => {
  const getCategories = async () => {
   const res = await getDataCategories()
   setCategories(res.data)
  }

  getCategories()
 }, [])
 return {
  isCategories: [categories, setCategories],
 }
}

export default CategoriesApi
