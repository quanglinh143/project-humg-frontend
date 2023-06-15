import React, { useContext, useState } from "react"
import { Input } from "antd"
import { resetPassword } from "services/api-client/userApi"
import { openNotification } from "atomics/Notification"
import { GlobalState } from "GlobalState"
import classes from "./ResetPassword.module.scss"

const initialState = {
 oldPassword: "",
 password: "",
 rePassword: "",
}

const ResetPassword = () => {
 const values = useContext(GlobalState)
 const [user] = values.userApi.isUser
 const [token] = values.isToken
 const [newPassword, setNewPassword] = useState(initialState)

 const handleOnchangePassword = (event) => {
  const { name, value } = event.target
  setNewPassword({ ...newPassword, [name]: value })
 }

 const handleResetPassword = async (event) => {
  event.preventDefault()
  try {
   const res = await resetPassword({
    token: token,
    id: user?._id,
    newPassword: newPassword,
   })
   if (res.status === 200) {
    setNewPassword(initialState)
    openNotification("success", "Cập nhật thành công")
   }
  } catch (error) {
   openNotification("error", error.msg || "Đã có lỗi xảy ra")
  }
 }
 return (
  <div className={classes.container}>
   <div className={classes.formReset}>
    <form className={classes.form} onSubmit={handleResetPassword}>
     <div className={classes.title}>Đổi mật khẩu</div>
     <div>
      <div className={classes.text}>Mật khẩu hiện tại:</div>
      <Input.Password
       placeholder="Vui lòng nhập..."
       name="oldPassword"
       value={newPassword.oldPassword}
       className={classes.input}
       onChange={handleOnchangePassword}
      />
     </div>
     <div>
      <div className={classes.text}>Mật khẩu mới:</div>

      <Input.Password
       placeholder="Vui lòng nhập.."
       name="password"
       value={newPassword.password}
       className={classes.input}
       onChange={handleOnchangePassword}
      />
     </div>
     <div>
      <div className={classes.text}>Nhập lại mật khẩu mới:</div>
      <Input.Password
       placeholder="Vui lòng nhập.."
       name="rePassword"
       value={newPassword.rePassword}
       className={classes.input}
       onChange={handleOnchangePassword}
      />
     </div>
     <div className={classes.updateBtn}>
      <button className={classes.updateBtn_cancel}>Hủy</button>
      <button className={classes.updateBtn_submit} type="submit">
       Cập nhật
      </button>
     </div>
    </form>
   </div>
  </div>
 )
}

export default ResetPassword
