import { useEffect, useState } from "react"
import { getDataCategories } from "services/api-client/categoriesApi"
import { getDataBrands } from "services/api-client/brandsApi"
import { openNotification } from "atomics/Notification"

const SideMenu = () => {
 const [categories, setCategories] = useState([])
 const [brands, setBrands] = useState()
 const [loading, setLoading] = useState([])

 const fetchAllDataSideMenu = async () => {
  setLoading(true)
  try {
   const [getDataCategoriesResult, getDataBrandsResult] = await Promise.all([
    getDataCategories(),
    getDataBrands(),
   ])
   if (
    getDataCategoriesResult.status === 200 &&
    getDataBrandsResult.status === 200
   ) {
    setCategories(getDataCategoriesResult.data)
    setBrands(getDataBrandsResult.data)
   }
  } catch (error) {
   openNotification("error", error.msg || "Đã có lỗi xảy ra")
  }
  setLoading(false)
 }

 useEffect(() => {
  fetchAllDataSideMenu()
 }, [])

 return {
  isCategories: [categories, setCategories],
  isBrands: [brands, setBrands],
  isLoading: [loading, setLoading],
 }
}

export default SideMenu
