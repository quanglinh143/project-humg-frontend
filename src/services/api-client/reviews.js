import Instance from "services/instance.js"

export function getReviewsProductById(id, currentPage, limit) {
 return Instance.get(
  `/api/products/${id}/reviews?page=${currentPage}&limit=${limit}`
 )
}

export function createReviewsProductById(
 idUser,
 id,
 title,
 comment,
 rating,
 token
) {
 console.log("rating", rating)
 return Instance.post(
  `/api/products/${id}/reviews`,
  { idUser, title, comment, rating },
  {
   headers: { Authorization: token },
  }
 )
}
