import React from "react"
import { Route, Routes } from "react-router-dom"
import HomePage from "pages/home-page"
import Cart from "pages/cart/cart"
import NotFound404 from "./404-not-found"
import Login from "./auth/login"
import Register from "./auth/register"
import History from "./history"
import ProductDetail from "./product-details"
import OrderDetail from "./oder-details"
import Account from "./account"
import { useWindowPosition } from "hooks/useWindowPosition"
import { UpIcon } from "icons"
import TawkMessengerReact from "@tawk.to/tawk-messenger-react"

import classes from "./Mainpages.module.scss"

const MainPages = () => {
 function handleScrollToTop() {
  window.scrollTo({
   top: 0,
   behavior: "smooth",
  })
 }
 return (
  <div>
   <Routes>
    <Route path="/" exact element={<HomePage />} />
    <Route path="/detail/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/user/account" element={<Account />} />
    <Route path="/history" element={<History />} />
    <Route path="/history/:id" element={<OrderDetail />} />
    <Route path="*" element={<NotFound404 />} />
   </Routes>
   <div>
    {useWindowPosition() > 250 && (
     <div onClick={handleScrollToTop} className={classes.scrollToTop}>
      <UpIcon className={classes.scrollToTop_icon} />
     </div>
    )}
   </div>

   <div>
    <TawkMessengerReact
     propertyId="property_id"
     widgetId="1h0f91b48"
     className={classes.tawl}
    />
   </div>
  </div>
 )
}

export default MainPages
