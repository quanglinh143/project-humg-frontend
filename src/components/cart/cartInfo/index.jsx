import React, { useContext, useState } from "react"
import classes from "./CartInfo.module.scss"
import Input from "atomics/input"
import { Button } from "antd"
import { GlobalState } from "GlobalState"
import Instance from "services/instance"
import { openNotification } from "atomics/Notification"

const CartInfo = ({ title, name, value, infoUser, setInfoUser }) => {
 const [edit, setEdit] = useState(false)
 const values = useContext(GlobalState)
 const [token] = values.isToken
 const [user] = values.userApi.isUser
 const [idUser] = values.userApi.isIDUser
 const [callback, setCallback] = values.userApi.isCallback

 const handleChangeInfoCheckout = (event) => {
  const { name, value } = event.target
  setInfoUser({ ...infoUser, [name]: value })
 }

 const handleEdit = (name) => {
  setEdit(!edit)
  if (name === "name") {
   setInfoUser({ ...infoUser, name: user?.name })
  }
  if (name === "phone_number") {
   setInfoUser({ ...infoUser, phone_number: user?.phone_number })
  }
  if (name === "address") {
   setInfoUser({ ...infoUser, address: user?.address })
  }
 }

 const handleCancel = () => {
  setEdit(false)
  if (name === "name") {
   setInfoUser({ ...infoUser, name: user?.name })
  }
  if (name === "phone_number") {
   setInfoUser({ ...infoUser, phone_number: user?.phone_number })
  }
  if (name === "address") {
   setInfoUser({ ...infoUser, address: user?.address })
  }
 }

 const handleUpdateInfoCheckout = async () => {
  try {
   const res = await Instance.post(
    "/user/updateInfo",
    { ...infoUser, id: idUser },
    {
     headers: { Authorization: token },
    }
   )
   if (res.status === 200) {
    openNotification("success", "Cập nhật thành công!")
    setEdit(false)
    setCallback(!callback)
   }
  } catch (error) {
   openNotification("error", error || "Đã có lỗi xảy ra.")
  }
 }
 return (
  <div className={classes.boxItem}>
   <div className={classes.boxItem_title}>
    <div className={classes.boxItem_title_text}>{title}</div>
    <div
     className={classes.boxItem_title_edit}
     onClick={() => handleEdit(name)}
    >
     Chỉnh sửa
    </div>
   </div>
   {!edit && <div className={classes.boxItem_value}>{value}</div>}
   {edit && (
    <div>
     <Input name={name} value={value} onChange={handleChangeInfoCheckout} />
     <div className={classes.btn}>
      <Button onClick={() => handleCancel(name)} className={classes.cancelBtn}>
       Hủy bỏ
      </Button>
      <Button onClick={handleUpdateInfoCheckout} className={classes.updateBtn}>
       Cập nhật
      </Button>
     </div>
    </div>
   )}
  </div>
 )
}

export default CartInfo
