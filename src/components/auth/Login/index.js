import React, { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { openNotification } from "atomics/Notification"
import { Button, Form, Input } from "antd"
import { loginApi } from "services/api-client/auth"
import classes from "./Login.module.scss"
import { GlobalState } from "GlobalState.js"

const LoginComponent = () => {
 const navigate = useNavigate()
 const values = useContext(GlobalState)
 const [isLogged, setIsLogged] = values.userApi.isLogged
 const [loadingSubmit, setLoadingSubmit] = useState(false)
 useEffect(() => {
  if (isLogged) {
   //  window.location.href = "/"
   navigate("/")
  }
 }, [isLogged])
 const handleFinish = async (values) => {
  const { email, password } = values
  try {
   const response = await loginApi({ email, password })
   if (response.status === 200) {
    localStorage.setItem("login", true)
    setIsLogged(true)
    // window.location.href = "/"
    navigate("/", { replace: true })
   }
  } catch (error) {
   openNotification("error", error.msg)
  }
 }

 const formLogin = () => {
  return (
   <div className={classes.formItem}>
    <h1 className={classes.title}>Đăng nhập</h1>
    <h4 className={classes.slogan}>Bạn đã sẵn sàng cho lễ hội mua sắm?</h4>
    <Form onFinish={handleFinish}>
     <Form.Item
      name="email"
      className={classes.formItem}
      rules={[
       {
        type: "email",
        message: "Vui lòng nhập đúng định dạng email!",
       },
       {
        required: true,
        message: "Vui lòng nhập đúng định dạng email!",
       },
      ]}
      normalize={(value) => value.trim()}
     >
      <div className={classes.boxInput}>
       <div className={classes.label}>Email</div>
       <Input placeholder="Vui lòng nhập đúng định dạng email.." />
      </div>
     </Form.Item>
     <Form.Item
      name="password"
      className={classes.formItem}
      style={{ marginBottom: "14px" }}
      rules={[
       {
        required: true,
        message: "Vui lòng nhập đúng định dạng...",
       },
       {
        whitespace: false,
        message: "Vui lòng không để khoảng trắng",
       },
      ]}
     >
      <div className={classes.boxInput}>
       <div className={classes.label}>Password</div>
       <Input.Password placeholder="Please enter password format" />
      </div>
     </Form.Item>
     <div className={classes.row}>
      <Button
       type="primary"
       htmlType="submit"
       disabled={loadingSubmit}
       className={classes.loginBtn}
      >
       Đăng nhập
      </Button>
      <div className={classes.register}>
       <div>Bạn đã có tài khoản chưa??</div>
       <Link to="/register" className={classes.register_btn}>
        Đăng ký
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
    <img src="images/bannerLogin1.jpg" />
   </div>
   <div className={classes.form}>{formLogin()}</div>
  </div>
 )
}

export default LoginComponent
