import React, { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GlobalState } from "GlobalState"
import classes from "./OrderDetail.module.scss"
import {
 getPaymentById,
 orderStatusPayment,
} from "services/api-client/payments"
import { openNotification } from "atomics/Notification"
import { Skeleton } from "antd"
const OrderDetailComponent = () => {
 const navigate = useNavigate()
 const values = useContext(GlobalState)
 const [token] = values.isToken
 const [idUser] = values.userApi.isIDUser
 const [history] = values.userApi.isHistory
 const [status, setStatus] = values.userApi.isStatus
 const [callback, setCallback] = values.userApi.isCallback
 const [oderDetail, setOrderDetail] = useState([])
 const [loading, setLoading] = useState(false)
 const params = useParams()
 console.log("oderDetail", oderDetail)
 useEffect(() => {
  const login = localStorage.getItem("login")
  if (!login) {
   return navigate("/login")
  }
 }, [])
 const getDataPaymentById = async (idPayment) => {
  setLoading(true)
  try {
   const response = await getPaymentById(idPayment, idUser, token)
   setOrderDetail(response.data)
   setStatus(response.data.status)
  } catch (error) {
   openNotification("error", error.msg || "Đã có lỗi xảy ra")
  }
  setLoading(false)
 }

 useEffect(() => {
  if ((token, idUser)) {
   getDataPaymentById(params.id, token)
  }
 }, [params.id, history, token, idUser, status])

 const handelOrderStatusPayment = async (item, status) => {
  try {
   const response = await orderStatusPayment(item, status)
   if (response.status === 200) {
    setStatus(status)
    setCallback(!callback)
   }
  } catch (error) {
   openNotification("error", error.msg || "Đã có lỗi xảy ra")
  }
 }

 const statusOrder = () => {
  return (
   <div className={classes.order}>
    <h2>Tình trạng đơn hàng:</h2>
    <div className={classes.order_status}>
     {status === "0" && <h3>Đơn hàng đang chờ xác nhận:</h3>}
     {status === "1" && <h3>Vui lòng xác nhận đơn hàng:</h3>}
     {status === "2" && <h3>Người mua xác nhận:</h3>}
     {status === "3" && <h3>Người mua xác nhận:</h3>}
     {status === "4" && <h3>Người mua xác nhận:</h3>}
     {status === "0" && (
      <button
       onClick={() => handelOrderStatusPayment(oderDetail, "4")}
       className={`${classes.order_status_noti} ${classes.order_status_cancel}`}
      >
       Hủy đơn hàng
      </button>
     )}
     {status === "1" && (
      <div className={classes.order_status_transported}>
       <button
        onClick={() => handelOrderStatusPayment(oderDetail, "2")}
        className={`${classes.order_status_noti} ${classes.order_status_transported_notReceived}`}
       >
        Chưa nhận được hàng
       </button>
       <button
        onClick={() => handelOrderStatusPayment(oderDetail, "3")}
        className={`${classes.order_status_noti} ${classes.order_status_transported_received}`}
       >
        Đã nhận được hàng
       </button>
      </div>
     )}
     {status === "2" && (
      <div
       className={`${classes.order_status_noti} ${classes.order_status_result}`}
      >
       Chưa nhận được hàng
      </div>
     )}
     {status === "3" && (
      <div
       className={`${classes.order_status_noti} ${classes.order_status_result}`}
      >
       Đã nhận được hàng
      </div>
     )}
     {status === "4" && (
      <div
       className={`${classes.order_status_noti} ${classes.order_status_result}`}
      >
       Hủy đơn hàng
      </div>
     )}
    </div>
   </div>
  )
 }

 if (loading) return <Skeleton />
 return (
  <div className={classes.container}>
   <div className={classes.paymentCard}>
    <h2 className={classes.listDetail_title}>Người mua:</h2>
    <table>
     <thead>
      <tr>
       <th>Tên</th>
       <th>Số điện thoại</th>
       <th>Địa chỉ</th>
       <th>Phương thức thanh toán</th>
       <th>Email</th>
      </tr>
     </thead>
     <tbody>
      <tr>
       <td>{oderDetail?.name}</td>
       <td>{oderDetail?.phone_number}</td>
       <td>{oderDetail?.address}</td>
       <td>
        {oderDetail?.status === "0"
         ? "Chuyển khoản"
         : "Thanh toán khi nhận hàng"}
       </td>
       <td>{oderDetail?.email}</td>
      </tr>
     </tbody>
    </table>

    <div className={classes.listDetail}>
     <h2 className={classes.listDetail_title}>Sản phẩm thanh toán:</h2>
     <table>
      <thead>
       <tr>
        <th>No.</th>
        <th>Sản phẩm</th>
        <th>Số lượng</th>
        <th>Giá</th>
       </tr>
      </thead>
      <tbody>
       {oderDetail?.cart?.map((item, index) => {
        return (
         <tr key={item._id}>
          <td>{index + 1}</td>
          <td className={classes.listDetail_img}>
           <img src={item?.images?.url} alt="" />
          </td>
          <td>{item?.qty}</td>
          <td className={classes.price}>
           {item?.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
           })}
          </td>
         </tr>
        )
       })}
      </tbody>
     </table>
    </div>
    {statusOrder()}
   </div>
  </div>
 )
}

export default OrderDetailComponent
