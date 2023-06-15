import React, { useCallback, useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { UserOutlined } from "@ant-design/icons"
import { Avatar, Modal, Rate } from "antd"
import Promotion from "components/promotion"
import Related from "components/related"
import Reviews from "components/reviews"

import Loading from "utils/Loading"
import { openNotification } from "atomics/Notification"
import { createReviewsProductById } from "services/api-client/reviews"
import { getProductDetailApi } from "services/api-client/products"
import { GlobalState } from "GlobalState"

import classes from "./ProductDetail.module.scss"

const RatingText = [
 "Too bad, I'm not satisfied with the product!!",
 "Not satisfied, I'm not satisfied with the product!",
 "Normally, I find the product to be okay!",
 "'Good, I'm satisfied with the product!'",
 "Excellent, great product!",
]
const ProductDetailComponent = () => {
 const values = useContext(GlobalState)
 const [token] = values.isToken
 const [dataDetail, setDataDetail] = useState([])
 const [loading, setLoading] = useState(false)
 const params = useParams()
 const { id } = params
 const [products] = values.productsApi.products
 const addToCart = values.userApi.addToCart
 const [user] = values.userApi.isUser
 const [idUser] = values.userApi.isIDUser
 const [totalReviews] = values.reviewsApi.isTotalReviews
 const [callback, setCallback] = values.reviewsApi.isCallback
 const [title, setTitle] = useState(RatingText[RatingText.length - 1])
 const [comment, setComment] = useState("")
 const [rating, setRating] = useState(5)
 const [isModalOpen, setIsModalOpen] = useState(false)
 const navigate = useNavigate()

 const getProductDetail = async () => {
  setLoading(true)

  try {
   const response = await getProductDetailApi(id)
   if (response.data === "") {
    navigate("/")
   } else {
    setDataDetail(response.data)
   }
  } catch (error) {
   return navigate("/")
  }
  setLoading(false)
 }
 useEffect(() => {
  window.scrollTo(0, 0)
  getProductDetail()
 }, [id])

 const handleCreateReviewsProduct = useCallback(() => {
  if (!token) {
   navigate("/login")
  }
  setIsModalOpen(true)
 }, [isModalOpen, token])

 const handleChangeValueRating = useCallback(
  (value) => {
   setRating(value)
   setTitle(RatingText[value - 1])
  },
  [rating]
 )
 const handleOnchangeValueComment = useCallback(
  (event) => {
   setComment(event.target.value)
  },
  [comment]
 )

 const handleSubmitReview = async (event) => {
  event.preventDefault()
  try {
   const response = await createReviewsProductById(
    idUser,
    id,
    title,
    comment,
    rating,
    token
   )
   if (response.status === 200) {
    openNotification("success", "Đánh giá sản phẩm thành công")
   }
  } catch (error) {
   openNotification("error", error.msg || "Đã có lỗi xảy ra")
  }
  handleCancel()
  setCallback(!callback)
 }

 const handleCancel = () => {
  setComment("")
  setRating(5)
  setIsModalOpen(false)
 }
 const relatedItem = products?.filter((product) => {
  return (
   product?.category === dataDetail?.category &&
   product?._id !== dataDetail?._id
  )
 })

 const createReviewsProduct = () => {
  return (
   <Modal
    open={isModalOpen}
    title="Bạn đánh gí sản phẩm này thế nào?"
    className={classes.modalUpdate}
    onCancel={handleCancel}
   >
    <form className={classes.content} onSubmit={handleSubmitReview}>
     <div className={classes.avatarWrapper}>
      {user?.avatar?.url ? (
       <Avatar src={user?.avatar?.url} size={54} />
      ) : (
       <Avatar size={54} icon={<UserOutlined />} />
      )}
     </div>
     <p className={classes.username}>{user?.name}</p>
     <Rate
      size={28}
      value={rating}
      onChange={handleChangeValueRating}
      allowClear={false}
     />
     {rating > 0 && (
      <p className={classes.ratingText}>{RatingText[rating - 1]}</p>
     )}
     <div className={classes.title}>
      <span
       style={{
        display: "block",
        color: "#ff4d4f",
        marginRight: 4,
        transform: "translateY(2px)",
       }}
      >
       *
      </span>
      <span>Đánh giá của bạn cho sản phẩm này</span>
     </div>
     <textarea rows={5} value={comment} onChange={handleOnchangeValueComment} />
     <div className={classes.submit}>
      <button type="submit">Đánh giá</button>
     </div>
    </form>
   </Modal>
  )
 }
 const related = () => {
  return (
   <>
    <Related
     data={relatedItem}
     text="Sản phẩm liên quan"
     description="Không có sản phẩm liên quan"
    />
   </>
  )
 }
 if (loading)
  return (
   <div className={classes.loading}>
    <Loading />
   </div>
  )
 return (
  <div className={classes.container}>
   <div className={classes.productDetail}>
    <div className={classes.productDetail_img}>
     <img
      src={dataDetail?.images?.url}
      alt={dataDetail?.images?.url}
      className={classes.imgProduct}
     />
    </div>
    <div className={classes.info}>
     <div className={classes.boxDetail}>
      <div className={classes.boxDetail_info}>
       <h2 className={classes.boxDetail_info_title}>{dataDetail.name}</h2>
       <h6>#id: {dataDetail._id}</h6>
      </div>
      <span className={classes.boxDetail_price}>$ {dataDetail.price}</span>
      <div className={classes.boxDetail_rates}>
       <div className={classes.boxDetail_rates_star}>
        <div>{dataDetail.ratings}</div>
        <Rate
         count={1}
         value={1}
         disabled
         className={classes.boxDetail_rates_star_rating}
        />
       </div>
       <div>-</div>
       <div className={classes.boxDetail_rates_review}>
        <div>{totalReviews}</div>
        <div>Đánh giá</div>
       </div>
       <div>-</div>
       <div className={classes.boxDetail_rates_sold}>
        <div>{dataDetail.sold}</div>
        <div>Đã bán</div>
       </div>
       <div>-</div>
       <div className={classes.boxDetail_rates_remaining}>
        <div>{dataDetail.remaining}</div>
        <div>Có sẵn</div>
       </div>
      </div>
      <p className={classes.boxDetail_description}>{dataDetail.description}</p>

      <div className={classes.boxDetail_content}>
       <span>Nội dung:</span>
       <p className={classes.boxDetail_content_description}>
        {dataDetail.content}
       </p>
      </div>
      <div>
       <div className={classes.boxDetail_status}>
        <span className={classes.boxDetail_status_title}>Tình trạng:</span>
        {dataDetail.remaining > 0 ? (
         <div className={classes.boxDetail_status_stock}>Còn hàng</div>
        ) : (
         <div className={classes.boxDetail_status_outOfStock}>Hết hàng</div>
        )}
       </div>
      </div>
      <Promotion />
      <Link
       to="/cart"
       className={classes.cart}
       onClick={() => addToCart(dataDetail)}
      >
       Mua ngay
      </Link>
      <div className={classes.btnActions}>
       <button
        className={classes.btnActions_review}
        onClick={handleCreateReviewsProduct}
       >
        Đánh giá
       </button>
       <button
        className={classes.btnActions_addToCart}
        onClick={() => addToCart(dataDetail)}
       >
        Thêm vào giỏ
       </button>
      </div>
     </div>
    </div>
   </div>
   {createReviewsProduct()}
   <Reviews />
   {related()}
  </div>
 )
}

export default ProductDetailComponent
