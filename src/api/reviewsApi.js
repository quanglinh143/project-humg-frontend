import { useEffect, useState } from "react"

import { openNotification } from "atomics/Notification"
import { getReviewsProductById } from "services/api-client/reviews"

const ReviewsApi = () => {
 const [review, setReview] = useState([])
 const [totalReviews, setTotalReviews] = useState(0)
 const [callback, setCallback] = useState(true)
 const [idProduct, setIdProduct] = useState("")
 const [pageCount, setPageCount] = useState(0)
 const [currentPage, setCurrentPage] = useState(0)
 const limit = 3

 const getDataReviews = async () => {
  if (idProduct) {
   try {
    const response = await getReviewsProductById(
     idProduct,
     currentPage + 1,
     limit
    )
    if (response.status === 200) {
     setReview(response.data.result)
     setTotalReviews(response.data.totalReviews)
     setPageCount(response.data.pageCount)
    }
   } catch (error) {
    openNotification("error", error.msg || "Đã có lỗi xảy ra.")
   }
  }
 }
 useEffect(() => {
  getDataReviews()
 }, [callback, idProduct, currentPage])
 return {
  isReviews: [review, setReview],
  isTotalReviews: [totalReviews, setTotalReviews],
  isIdProduct: [idProduct, setIdProduct],
  isPageCount: [pageCount, setPageCount],
  isCurrentPage: [currentPage, setCurrentPage],
  isCallback: [callback, setCallback],
 }
}

export default ReviewsApi
