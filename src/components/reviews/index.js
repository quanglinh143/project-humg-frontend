import React, { useContext, useEffect } from "react"
import { Rate } from "antd"
import { useParams } from "react-router-dom"
import moment from "moment"
import NotFound from "utils/NotFound"
import Paginate from "components/paginate"
import { GlobalState } from "GlobalState"

import classes from "./Reviews.module.scss"

const Reviews = () => {
 const values = useContext(GlobalState)
 const [_, setIdProduct] = values.reviewsApi.isIdProduct
 const [review] = values.reviewsApi.isReviews
 const [pageCount] = values.reviewsApi.isPageCount
 const [currentPage, setCurrentPage] = values.reviewsApi.isCurrentPage
 const { id } = useParams()

 useEffect(() => {
  setIdProduct(id)
 }, [id])

 const handlePageClick = async (e) => {
  setCurrentPage(e.selected)
 }

 return (
  <div className={classes.container}>
   <h2 className={classes.title}>Đánh giá sản phẩm</h2>
   {review?.length > 0 ? (
    review?.map((rv) => {
     return (
      <div key={rv._id}>
       <div className={classes.review}>
        <div className={classes.info}>
         <div className={classes.info_name}>{rv.name}</div>
         <div className={classes.info_createdAt}>
          {moment(rv.createdAt).format("DD/MM/YYYY")}
         </div>
        </div>
        <div className={classes.rating}>
         <Rate value={rv.rating} disabled />
        </div>
        <div className={classes.content}>
         <div className={classes.content_title}>{rv.title}</div>
         <div className={classes.content_description}>{rv.comment}</div>
        </div>
       </div>
      </div>
     )
    })
   ) : (
    <NotFound description="Hiện chưa có đánh giá cho sản phẩm này" />
   )}
   {review?.length > 0 && (
    <div className={classes.paginate}>
     <Paginate
      onHandlePageClick={handlePageClick}
      pageCount={pageCount}
      currentPage={currentPage}
     />
    </div>
   )}
  </div>
 )
}

export default Reviews
