import React, { useContext, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import Instance from "services/instance.js"
import { Popover, Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import Bars from "icons/bars.svg"
import ShoppingCart from "icons/shoppingCart.svg"

import classes from "./Header.module.scss"
import Search from "antd/es/input/Search"
import { HomeIcon, HistoryIcon, SettingIcon, LogoutIcon } from "icons"
import { GlobalState } from "GlobalState"

const Header = () => {
 const values = useContext(GlobalState)

 const [user] = values.userApi.isUser
 const [isLogged] = values.userApi.isLogged
 const [cart] = values.userApi.isCart
 const navigate = useNavigate()
 const onSearch = (value) => {
  if (value === "") {
   window.location.href = "/"
  } else {
   window.location.href = `/?keyword=${value}`
  }
 }

 const backToHomepage = () => {
  window.location.href = "/"
 }

 const handleHistory = () => {
  navigate("/history")
 }

 const handleSettings = () => {
  navigate("/user/account")
 }

 const handleLogout = async () => {
  await Instance.get("/user/logout")
  localStorage.removeItem("login")
  localStorage.removeItem("admin")
  localStorage.removeItem("__paypal_storage__")
  localStorage.removeItem("authToken")

  const cookies = document.cookie.split(";")
  for (let i = 0; i < cookies.length; i++) {
   const cookie = cookies[i]
   const equalsIndex = cookie.indexOf("=")
   const cookieName =
    equalsIndex > -1 ? cookie.substr(0, equalsIndex).trim() : cookie.trim()
   document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }

  window.location.href = "/login"
 }

 const dataMenu = useMemo(() => {
  return [
   {
    icon: <HomeIcon />,
    label: "Trang chủ",
    callback: backToHomepage,
   },
   {
    icon: <HistoryIcon />,
    label: "Lịch sử",
    callback: handleHistory,
   },
   {
    icon: <SettingIcon />,
    label: "Cài đặt",
    callback: handleSettings,
   },
   {
    icon: <LogoutIcon />,
    label: "Đăng xuất",
    callback: handleLogout,
   },
  ]
 }, [])
 const menuItem = () => {
  return (
   <>
    <div className={classes.headInfo}>
     <div className={classes.headInfo_img}>
      <Avatar size={48} icon={<UserOutlined />} />
     </div>
     <div className={classes.headInfo_person}>
      <div className={classes.headInfo_person_name}>{user?.name}</div>
      <div className={classes.headInfo_person_position}>
       {user?.role === 0 ? `hạng: ${user?.rank}` : "administrators"}
      </div>
     </div>
    </div>
    {dataMenu.map((item, index) => {
     return (
      <div className={classes.box} onClick={item.callback} key={index}>
       {item.icon}
       <div className={classes.text}>{item.label}</div>
      </div>
     )
    })}
   </>
  )
 }

 const loggedRouter = () => {
  return (
   <div className={classes.person}>
    <Popover
     content={menuItem}
     trigger="click"
     overlayClassName={classes.person_info}
    >
     {user && user.avatar ? (
      <img
       src={user.avatar.url}
       alt={user.avatar.url}
       className={classes.avatarHeader}
      />
     ) : (
      <Avatar size={32} icon={<UserOutlined />} />
     )}
    </Popover>
   </div>
  )
 }
 return (
  <div className={classes.container}>
   <div className={classes.menu}>
    <img src={Bars} width={30} />
   </div>

   <div className={classes.logo} onClick={backToHomepage}>
    <img className={classes.logoHeader} src="/images/logoChamm.png" alt="" />
   </div>

   <div className={classes.rightContent}>
    <div className={classes.searchInput}>
     <Search
      placeholder="Tìm kiếm sản phẩm..."
      onSearch={onSearch}
      className={classes.searchInput_input}
     />
    </div>

    <div className={classes.cartIcon}>
     <div className={classes.shoppingCart}>
      <span>{cart.length}</span>
      <Link to="/cart" className={classes.shoppingCart_icon}>
       <img src={ShoppingCart} alt={ShoppingCart} width={20} />
      </Link>
     </div>
    </div>
    {isLogged ? (
     loggedRouter()
    ) : (
     <Link to="/login" className={classes.loginBtn}>
      Đăng nhập
     </Link>
    )}
   </div>
  </div>
 )
}

export default Header
