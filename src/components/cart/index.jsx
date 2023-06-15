import React, { useContext, useEffect, useMemo, useState } from "react"
import { openNotification } from "atomics/Notification"
import Instance from "services/instance"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { GlobalState } from "GlobalState"
import { useLocation } from "react-router-dom"
import { Button } from "antd"
import classes from "./Cart.module.scss"
import CartInfo from "./cartInfo"
import { confirmCoupon } from "services/api-client/couponApi"

const initialState = {
 name: "",
 phone_number: "",
 address: "",
}
const CartComponent = () => {
 const values = useContext(GlobalState)
 const [token] = values.isToken
 const [user, setUser] = values.userApi.isUser
 const [IDuser, setIDUser] = values.userApi.isIDUser
 const [callback, setCallback] = values.userApi.isCallback
 const [cart, setCart] = values.userApi.isCart
 const [total, setTotal] = useState(0)
 const [infoUser, setInfoUser] = useState(initialState)
 const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
 const [summaryCheckout, setSummaryCheckout] = useState([])
 const [nameOfCoupon, setNameOfCoupon] = useState()
 const [idOfCoupon, setIdOfCoupon] = useState()
 const [couponCode, setCouponCode] = useState(null)
 const [valueDiscountCoupon, setValueDiscountCoupon] = useState(null)
 const { pathname } = useLocation()
 const vndUsd = 24000
 console.log("IDuser", IDuser)
 useEffect(() => {
  window.scrollTo(0, 0)
 }, [pathname])

 const getTotal = () => {
  const total = summaryCheckout?.reduce((prev, item) => {
   return prev + item.price * item.qty
  }, 0)
  setTotal(total)
  if (user.rank !== 0 || valueDiscountCoupon) {
   setTotalAfterDiscount(
    total - (total * user.discount) / 100 - (total * valueDiscountCoupon) / 100
   )
  } else {
   setTotalAfterDiscount(total)
  }
 }
 const [approved, setApproved] = useState(false)
 useMemo(() => {
  getTotal()
  setInfoUser({
   name: user?.name,
   phone_number: user?.phone_number,
   address: user?.address,
  })
 }, [
  cart,
  user?.name,
  user?.phone_number,
  user?.address,
  summaryCheckout,
  valueDiscountCoupon,
 ])

 useEffect(() => {
  const onApprovedCheckout = async () => {
   if ((token, approved)) {
    try {
     const response = await Instance.post(
      "/api/payment",
      {
       cart: summaryCheckout,
       address: infoUser?.address,
       totalPurchasePrice: totalAfterDiscount,
       methodShipping: "0",
       phone_number: infoUser?.phone_number,
       coupon: couponCode,
      },
      {
       headers: { Authorization: token },
      }
     )
     if (response.status === 200) {
      const filterCart = (cartArr, summaryArr) => {
       if (!cartArr || !summaryArr) return []

       const arr = []
       summaryArr.map((item) => arr.push(item._id))
       return cartArr.filter((item) => !arr.includes(item._id))
      }
      setSummaryCheckout([])
      setCart(filterCart(cart, summaryCheckout))
      addToCart(filterCart(cart, summaryCheckout))

      const updateUser = await Instance.get("/user/info", {
       headers: { Authorization: token },
      })
      if (updateUser.status === 200) {
       setUser(updateUser.data)
       setCallback(!callback)
      }
     }
     openNotification("success", "Thanh toán thành công")
    } catch (error) {
     openNotification("error", error.msg || "Đã có lỗi xảy ra")
    }
   }
  }
  onApprovedCheckout()
 }, [approved, token])

 const addToCart = async (cart) => {
  await Instance.patch(
   "/user/addCart",
   { cart },
   {
    headers: { Authorization: token },
   }
  )
 }

 const increment = (id, remaining) => {
  cart.map((item) => {
   if (item._id === id) {
    if (item.qty + 1 > remaining) {
     item.qty = remaining
    } else {
     item.qty += 1
    }
   }
  })
  setCart([...cart])
  addToCart(cart)
 }

 const handleOnchangeQty = (id, event, remaining) => {
  cart.map((item) => {
   if (item._id === id) {
    if (parseInt(event.target.value) > remaining) {
     item.qty = remaining
    } else {
     item.qty = parseInt(event.target.value)
    }
   }
  })
  setCart([...cart])
  addToCart(cart)
 }

 const decrement = (id) => {
  cart.map((item) => {
   if (item._id === id) {
    item.qty === 1 ? (item.qty = 1) : (item.qty -= 1)
   }
  })
  setCart([...cart])
  addToCart(cart)
 }

 const removeProduct = (id) => {
  cart.map((item, index) => {
   if (item._id === id) {
    cart.splice(index, 1)
    openNotification("success", "Xóa khỏi giỏ hàng thành công.")
   }
  })
  setCart([...cart])
  addToCart(cart)
 }

 const handleCheckItems = (item) => {
  if (summaryCheckout.includes(item)) {
   setSummaryCheckout(
    summaryCheckout.filter((fil) => {
     return fil !== item
    })
   )
  } else {
   setSummaryCheckout((prev) => {
    return [...prev, item]
   })
  }
 }

 const handleOnApprove = () => {
  setApproved(true)
 }

 const paymentOnDelivery = async () => {
  if (token) {
   try {
    const response = await Instance.post(
     "/api/payment",
     {
      cart: summaryCheckout,
      address: infoUser?.address,
      totalPurchasePrice: totalAfterDiscount,
      methodShipping: "1",
      phone_number: infoUser?.phone_number,
      coupon: couponCode,
     },
     {
      headers: { Authorization: token },
     }
    )
    if (response.status === 200) {
     const filterCart = (cartArr, summaryArr) => {
      if (!cartArr || !summaryArr) return []

      const arr = []
      summaryArr.map((item) => arr.push(item._id))
      return cartArr.filter((item) => !arr.includes(item._id))
     }
     setSummaryCheckout([])
     setCart(filterCart(cart, summaryCheckout))
     addToCart(filterCart(cart, summaryCheckout))

     const updateUser = await Instance.get("/user/info", {
      headers: { Authorization: token },
     })
     if (updateUser.status === 200) {
      setUser(updateUser.data)
      setCallback(!callback)
     }
    }
    openNotification("success", "Thanh toán thành công")
   } catch (error) {
    openNotification("error", error.msg || "Đã có lỗi xảy ra")
   }
  }
 }
 const handleConfirmCoupon = async (event) => {
  event.preventDefault()
  if (token) {
   try {
    const response = await confirmCoupon(nameOfCoupon, IDuser, token)
    if (response.status === 200) {
     setValueDiscountCoupon(response.data.discounts)
     setCouponCode(response.data._id)
    }
   } catch (error) {
    openNotification("error", error.msg || "Đã có lỗi xảy ra")
   }
  }
 }

 const handleOnchangeNameOfCoupon = (event) => {
  setNameOfCoupon(event.target.value)
 }

 const addCoupon = () => {
  return (
   <form className={classes.addCoupon} onSubmit={handleConfirmCoupon}>
    <div className={classes.addCoupon_title}>Nhập mã giảm giá của bạn</div>
    <div className={classes.addCoupon_apply}>
     <input
      className={classes.addCoupon_apply_code}
      onChange={handleOnchangeNameOfCoupon}
     />
     <button className={classes.addCoupon_apply_submit}>Áp dụng</button>
    </div>
   </form>
  )
 }

 const renderCartEmpty = () => {
  const handlePushHome = () => {
   window.location.href = "/"
  }
  return (
   <div className={classes.cartEmpty}>
    <div className={classes.empty}>
     <img src="images/cartEmpty.png" alt="" className={classes.empty_img} />
     <div className={classes.empty_text}>
      Giỏ hàng hiện đang trống. Khám phá thêm các sản phẩm yêu thích của bạn
     </div>
     <button className={classes.empty_btn} onClick={handlePushHome}>
      Khám phá sản phẩm
     </button>
    </div>
   </div>
  )
 }
 const renderCartItem = () => {
  return (
   <ul className={classes.cartItem}>
    {cart &&
     cart.map((product) => {
      return (
       <li className={classes.productDetail} key={product._id}>
        <div className={classes.checkedBox}>
         <input type="checkbox" onClick={() => handleCheckItems(product)} />
        </div>
        <div className={classes.imgProduct}>
         <img src={product?.images?.url} alt={product?.images?.url} />
        </div>
        <div className={classes.boxDetail}>
         <div className={classes.boxDetail_info}>
          <h2 className={classes.boxDetail_info_title}>{product.name}</h2>
          <div className={classes.boxDetail_info_code}>#id: {product._id}</div>
         </div>
         <div className={classes.boxDetail_info_price}>
          <span className={classes.boxDetail_info_price_title}>Giá:</span>
          <p className={classes.boxDetail_info_price_description}>
           {product.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
           })}
          </p>
         </div>
         <div className={classes.boxDetail_info_remaining}>
          <span className={classes.boxDetail_info_remaining_title}>
           Có sẵn:
          </span>
          <p className={classes.boxDetail_info_remaining_description}>
           {product.remaining}
          </p>
         </div>
        </div>
        <div className={classes.amount}>
         <div
          className={classes.amount_minus}
          onClick={() => decrement(product._id)}
         >
          -
         </div>
         <input
          value={product.qty}
          className={classes.amount_qty}
          onChange={(event) =>
           handleOnchangeQty(product._id, event, product.remaining)
          }
         />
         <div
          className={classes.amount_plus}
          onClick={() => increment(product._id, product.remaining)}
         >
          +
         </div>
        </div>
        <div
         className={classes.boxDetail_info_delete}
         onClick={() => removeProduct(product._id)}
        >
         Xóa
        </div>
       </li>
      )
     })}
    {infoUserCheckout()}
   </ul>
  )
 }

 const infoUserCheckout = () => {
  return (
   <div className={classes.infoUserCheckout}>
    <h3 className={classes.title}>Thông tin nhận hàng</h3>
    <CartInfo
     title="Tên khách hàng:"
     name="name"
     value={infoUser?.name}
     infoUser={infoUser}
     setInfoUser={setInfoUser}
    />
    <CartInfo
     title="Số điện thoại:"
     name="phone_number"
     value={infoUser?.phone_number}
     infoUser={infoUser}
     setInfoUser={setInfoUser}
    />
    <CartInfo
     title="Địa chỉ:"
     name="address"
     value={infoUser?.address}
     infoUser={infoUser}
     setInfoUser={setInfoUser}
    />
   </div>
  )
 }
 const renderSummary = () => {
  return (
   <div className={classes.summary}>
    <div className={classes.box}>
     <div className={classes.title}>Hóa đơn</div>
     <div className={classes.endline} />
     <ul className={classes.listItem}>
      {summaryCheckout &&
       summaryCheckout.map((item) => {
        return (
         <li className={classes.listItem_item} key={item._id}>
          <div className={classes.listItem_item_name}>{item.name}</div>
          <div className={classes.listItem_item_qty}>x{item.qty}</div>
          <div className={classes.listItem_item_price}>
           {item?.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
           })}
          </div>
         </li>
        )
       })}
     </ul>
     <div className={classes.endline} />
     <div className={classes.total}>
      {addCoupon()}
      <div className={classes.total_price}>
       <span className={classes.total_price_title}>Tổng: </span>
       <span className={classes.total_price_value}>
        {total.toLocaleString("it-IT", {
         style: "currency",
         currency: "VND",
        })}
       </span>
      </div>
      {user?.rank !== "đồng" && (
       <div className={classes.total_discount}>
        <span className={classes.total_discount_title}>Giảm giá bởi hạng:</span>
        <span className={classes.total_discount_value}>{user.discount}%</span>
       </div>
      )}
      {valueDiscountCoupon && (
       <div className={classes.total_discount}>
        <span className={classes.total_discount_title}>Mã giảm giá:</span>
        <span className={classes.total_discount_value}>
         {valueDiscountCoupon}%
        </span>
       </div>
      )}

      {(user?.rank !== "đồng" || valueDiscountCoupon) && (
       <div className={classes.total_rank}>
        <span className={classes.total_rank_title}>
         Tổng thanh toán sau giảm:
        </span>
        <span className={classes.total_rank_value}>
         {totalAfterDiscount.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
         })}
        </span>
       </div>
      )}
     </div>
     <div className={classes.endline} />
     <Button
      className={classes.paymentOnDelivery}
      onClick={paymentOnDelivery}
      disabled={summaryCheckout.length === 0}
     >
      Thanh toán khi nhận hàng
     </Button>
     <div className={classes.payment}>
      <PayPalScriptProvider
       options={{
        "client-id":
         "AS2pYwW4uokdmh2COSDMbfDNTGb2M4RI0Ttz5XOabfYUStnvoN_A2gTTkXaj7X_lpWVFCpXHW6Fp6jNq",
       }}
      >
       <PayPalButtons
        style={{ layout: "horizontal", tagline: false }}
        disabled={summaryCheckout.length === 0}
        createOrder={(_, actions) => {
         return actions.order.create({
          purchase_units: [
           {
            amount: {
             value: (totalAfterDiscount / vndUsd).toFixed(2),
            },
           },
          ],
         })
        }}
        onError={(err) => {
         if (err.message === "Detected popup close") {
          openNotification("warning", "Thanh toán đã bị hủy")
         } else {
          console.log(err || "Đã có lỗi xảy ra")
         }
        }}
        onApprove={async (_, actions) => {
         try {
          const order = await actions.order.capture()
          // const paymentID = order.payer.payer_id
          const address = order.purchase_units[0]
          // handleOnApprove(paymentID, address)
          handleOnApprove(address)
         } catch (error) {
          openNotification("error", error.msg || "Đã có lỗi xảy ra")
         }
        }}
        forceReRender={[totalAfterDiscount]}
       />
      </PayPalScriptProvider>
     </div>
    </div>
   </div>
  )
 }

 return (
  <div className={classes.container}>
   {cart.length !== 0 ? (
    <div className={classes.showInfoInCart}>
     {renderCartItem()}
     {renderSummary()}
    </div>
   ) : (
    renderCartEmpty()
   )}
  </div>
 )
}

export default CartComponent
