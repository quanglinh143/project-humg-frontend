import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Form, Input } from "antd"
import { registerApi } from "services/api-client/auth"
import { GlobalState } from "GlobalState.js"
import { openNotification } from "atomics/Notification"

import classes from "./Register.module.scss"

const RegisterComponent = () => {
 const values = useContext(GlobalState)
 const [isLogged] = values.userApi.isLogged
 useEffect(() => {
  if (isLogged) {
   window.location.href = "/"
  }
 }, [isLogged])

 const [loadingSubmit, setLoadingSubmit] = useState(false)

 const handleFinish = async (values) => {
  const { name, email, password } = values
  setLoadingSubmit(true)
  try {
   const response = await registerApi({ name, email, password })
   if (response.status === 200) {
    localStorage.setItem("login", true)
    openNotification("success", "Đằng ký thành công")
    window.location.href = "/"
   }
  } catch (error) {
   openNotification("error", error.msg || "Đã có lỗi xảy ra")
  }
  setLoadingSubmit(false)
 }

 const formLogin = () => {
  return (
   <div className={classes.formItem}>
    <h1 className={classes.title}>Đăng ký</h1>
    <h4 className={classes.slogan}>Bạn đã sẵn sàng sự kiên mua săm hôm nay?</h4>
    <Form onFinish={handleFinish}>
     <Form.Item
      name="name"
      className={classes.formItem}
      rules={[
       {
        required: true,
        message: "Please enter username..",
       },
      ]}
      normalize={(value) => value.trim()}
     >
      <div className={classes.boxInput}>
       <div className={classes.label}>Tên</div>
       <Input placeholder="Please enter username.." />
      </div>
     </Form.Item>
     <Form.Item
      name="email"
      className={classes.formItem}
      rules={[
       {
        type: "email",
        message: "Please enter email format!",
       },
       {
        required: true,
        message: "Please enter email format!",
       },
      ]}
      normalize={(value) => value.trim()}
     >
      <div className={classes.boxInput}>
       <div className={classes.label}>Email</div>
       <Input placeholder="Please enter your email.." />
      </div>
     </Form.Item>
     <Form.Item
      name="password"
      className={classes.formItem}
      style={{ marginBottom: "14px" }}
      rules={[
       {
        required: true,
        message: "Please enter a password",
       },
       {
        whitespace: false,
        message: "no spaces",
       },
      ]}
     >
      <div className={classes.boxInput}>
       <div className={classes.label}>Mật khẩu</div>
       <Input.Password placeholder="Please enter your password.." />
      </div>
     </Form.Item>
     <div className={classes.row}>
      <Button
       type="primary"
       htmlType="submit"
       disabled={loadingSubmit}
       className={classes.loginBtn}
      >
       Đăng ký
      </Button>
      <div className={classes.register}>
       <div>Trở lại đăng nhập?</div>
       <Link to="/login" className={classes.register_btn}>
        Đăng nhập
       </Link>
      </div>
     </div>
    </Form>
   </div>
  )
 }
 return (
  <div className={classes.container}>
   <div className={classes.banner}>
    <img src="images/bannerLogin1.jpg" alt="" />
   </div>
   <div className={classes.form}>{formLogin()}</div>
  </div>
 )
}

export default RegisterComponent
