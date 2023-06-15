import React, { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GlobalState } from "GlobalState"
import classes from "./History.module.scss"

const OrderHistory = () => {
 const values = useContext(GlobalState)
 const [history] = values.userApi.isHistory
 const navigate = useNavigate()
 const login = localStorage.getItem("login")

 useEffect(() => {
  if (!login) {
   return navigate("/login")
  }
 }, [login, navigate])

 return (
  <div className={classes.container}>
   <h2 className={classes.title}>Lịch sử mua hàng</h2>
   <h4 className={classes.description}>
    Bạn có <span>{history.length}</span> thanh toán
   </h4>

   <table className={classes.table}>
    <thead className={classes.thead}>
     <tr>
      <th>ID</th>
      <th>Tình trạng</th>
      <th>Ngày thanh toán</th>
      <th>Hành động</th>
     </tr>
    </thead>
    <tbody>
     {history.map((item) => {
      return (
       <tr key={item._id}>
        <td>{item._id}</td>
        <td>
         {item.status === "0" && "Đang chờ xác nhận"}
         {item.status === "1" && "Đang vận chuyển"}
         {item.status === "2" && "Chưa nhận được hàng"}
         {item.status === "3" && "Đã nhận hàng"}
         {item.status === "4" && "Hủy đơn hàng"}
        </td>
        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
        <td>
         <Link to={`/history/${item._id}`}>Chi tiết</Link>
        </td>
       </tr>
      )
     })}
    </tbody>
   </table>
  </div>
 )
}

export default OrderHistory
