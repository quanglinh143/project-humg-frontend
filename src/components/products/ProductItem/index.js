import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { GlobalState } from "GlobalState"

import classes from "./ProductItem.module.scss"

const ProductItem = ({ product }) => {
 const values = useContext(GlobalState)
 const addToCart = values.userApi.addToCart

 const { name, images, price, description, remaining } = product

 const renderButtonItems = () => {
  return (
   <div className={classes.rowBtn}>
    <button onClick={() => addToCart(product)} className={classes.rowBtn_buy}>
     Thêm vào giỏ
    </button>
    <Link to={`/detail/${product._id}`} className={classes.rowBtn_detail}>
     Chi tiết
    </Link>
   </div>
  )
 }

 return (
  <div className={classes.container}>
   <div className={classes.imgItem}>
    <img src={images.url} alt={images.url} className={classes.img} />
   </div>
   <div className={classes.info}>
    <h2 className={classes.info_title}>{name}</h2>
    <div className={classes.info_status}>
     <span className={classes.info_status_price}>
      {price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
     </span>
     {remaining > 0 ? (
      <div className={classes.info_status_stock}>Còn hàng</div>
     ) : (
      <div className={classes.info_status_outOfStock}>Hết hàng</div>
     )}
    </div>

    <p className={classes.info_description}>{description}</p>
   </div>
   {renderButtonItems()}
  </div>
 )
}

export default ProductItem
