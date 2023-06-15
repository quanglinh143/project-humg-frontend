import Instance from "services/instance.js"

export function getDataProducts(search, currentPage, limit, filter, sort) {
 return Instance.get(
  `/api/products?keyword=${search}&page=${currentPage}&limit=${limit}&filter=${JSON.stringify(
   filter
  )}&sort=${sort}`
 )
}

export function getProductDetailApi(id) {
 return Instance.get(`/api/products/${id}`)
}
