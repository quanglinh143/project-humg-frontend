import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import classes from "./NotFound404.module.scss"
import LayoutBase from "components/LayoutBase"
const NotFound404 = () => {
 const navigate = useNavigate()

 //  useEffect(() => {
 //   const timeOut = setTimeout(() => {
 //    navigate("/", { replace: true })
 //   }, 5000)

 //   return () => {
 //    clearTimeout(timeOut)
 //   }
 //  }, [])

 return (
  <LayoutBase>
   <div className={classes.container}>
    <img src="/images/404.jpg" alt="images/404.jpg" />
   </div>
  </LayoutBase>
 )
}

export default NotFound404
