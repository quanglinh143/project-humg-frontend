import React, { useEffect, useState } from "react"
import { getDataBrands } from "services/api-client/brandsApi"

const BrandsApi = () => {
 const [brands, setBrands] = useState([])

 const getBrands = async () => {
  const res = await getDataBrands()
  setBrands(res.data)
 }
 useEffect(() => {
  getBrands()
 }, [])
 return {
  isBrands: [brands, setBrands],
 }
}

export default BrandsApi
