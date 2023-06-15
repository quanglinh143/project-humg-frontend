import { useState, useEffect } from "react"
import { getDataProducts } from "services/api-client/products"
import { openNotification } from "atomics/Notification"

const ProductsApi = () => {
 const [products, setProducts] = useState([])
 const [totalProducts, setTotalProducts] = useState([])
 const [callback, setCallback] = useState([])
 const [loading, setLoading] = useState([])
 const [filter, setFilter] = useState({
  brand: [],
  category: [],
  price: 0,
 })
 const [pageCount, setPageCount] = useState(0)
 const [currentPage, setCurrentPage] = useState(0)
 const sort = "-createdAt"
 const limit = 16
 const queryString = window.location.search
 const urlParams = new URLSearchParams(queryString)
 const search = urlParams.get("keyword") || ""

 const getProducts = async () => {
  try {
   setLoading(true)
   const response = await getDataProducts(
    search,
    currentPage + 1,
    limit,
    filter,
    sort
   )
   if (response.status === 200) {
    setProducts(response.data.result)
    setPageCount(response.data.pageCount)
    setTotalProducts(response.data.totalProducts)
   }
   setLoading(false)
  } catch (error) {
   openNotification("error", error.msg)
  }
 }

 useEffect(() => {
  getProducts()
 }, [callback, search, filter, currentPage])
 return {
  products: [products, setProducts],
  isFilter: [filter, setFilter],
  isTotal: [totalProducts, setTotalProducts],
  isPageCount: [pageCount, setPageCount],
  isCurrentPage: [currentPage, setCurrentPage],
  isLoading: [loading, setLoading],
  isCallback: [callback, setCallback],
 }
}

export default ProductsApi
